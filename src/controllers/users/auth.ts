import { NextFunction, Request, Response } from "express";
import JsonWebToken from "jsonwebtoken";
import { config } from "../../config";
import { OK } from "../../consts";
import { adminDto, adminUserDto, userDto, userProfileDto } from "../../dto";
import { ApiError } from "../../errors";
import { IAuth, IAuthAdmin } from "../../interfaces";
import {
  AdminModel,
  UserModel,
  UserNomineeModel,
  UserSponserByModel,
} from "../../database/models";
import { sendOtp } from "../../services";

export const userLogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uId, password } = req.body;
    const user = await UserModel.findOne({ uId: uId });
    if (!user) return next(ApiError.BadRequest("User not found!"));

    const isMatch = await user.validatePassword(password);

    if (!isMatch) return next(ApiError.BadRequest("Password does not match!"));

    const userData = userDto(user);

    userData.accessToken = JsonWebToken.sign(userData, config.SECRET_KEY);

    res.status(OK).json({
      status: OK,
      message: `Login successfully.`,
      data: userData,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(OK).json({
      status: OK,
      message: `Logout successfully.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const totalUsers = (await UserModel.countDocuments()) + 1;
    const zero =
      totalUsers.toString().length === 1
        ? "000"
        : totalUsers.toString().length === 2
        ? "00"
        : totalUsers.toString().length === 3 && "0";
    body.uId = zero ? "SONAX" + zero + totalUsers : "SONAX" + totalUsers;
    const user = await UserModel.create(body);

    if (user) {
      if (body.nomineeFirstName) {
        await UserNomineeModel.create({
          userId: user._id,
          firstName: body.nomineeFirstName,
          lastName: body.nomineeLastName,
          dob: body.nomineeDob,
          relation: body.nomineeRelation,
        });
      }

      const spo = await UserSponserByModel.findOne({
        parentId: body.parentId,
      });
      if (body.sponserId && !spo) {
        await UserSponserByModel.create({
          childs: {
            childId: user._id,
            placement: body.placement,
            sponserBy: body.sponserId,
          },
          parentId: body.parentId,
          sponserBy: body.sponserId,
        });
      } else if (spo?.childs && spo.childs.length < 2) {
        await UserSponserByModel.findOneAndUpdate(
          { parentId: body.parentId },
          {
            $push: {
              childs: {
                childId: user._id,
                placement: body.placement,
                sponserBy: body.sponserId,
              },
            },
          }
        );
      }
    }

    await sendOtp(
      `+91${user.mobile}`,
      `Welcome to Sonax Multitrade. You are registered with us. Your user ID: "${user.uId}" and PASSWORD: "${body.password}". You can login on https://sonaxmultitrade.in . Thank you.`
    );

    res.status(OK).json({
      status: OK,
      message: `Created successfully.`,
      user,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const changePAssword = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, body } = req;
    const user = await UserModel.findById(userId);
    if (!user) return next(ApiError.BadRequest("User not found!"));

    const isMatch = await user.validatePassword(body.oldPassword);

    if (!isMatch) return next(ApiError.BadRequest("Password does not match!"));

    await UserModel.findOneAndUpdate(
      { _id: userId },
      { password: body.password },
      { useFindAndModify: false }
    );

    res.status(OK).json({
      status: OK,
      message: `Updated successfully.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
