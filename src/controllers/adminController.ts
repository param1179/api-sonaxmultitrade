import { NextFunction, Request, Response } from "express";
import JsonWebToken from "jsonwebtoken";
import { config } from "../config";
import { OK } from "../consts";
import { adminDto } from "../dto";
import { ApiError } from "../errors";
import { IAuthAdmin } from "../interfaces";
import {
  AdminModel,
  UserModel,
  UserNomineeModel,
  UserSponserByModel,
} from "../database/models";
import { sendSms } from "../services/smsService";

export const adminSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const admin = await AdminModel.findOne({ email: body.email });

    if (admin) return next(ApiError.BadRequest("Email already exist!"));

    await AdminModel.create(body);
    res.status(OK).json({
      status: OK,
      message: `Register successfully.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email: email });
    if (!admin) return next(ApiError.BadRequest("User not found!"));

    const isMatch = await admin.validatePassword(password);

    if (!isMatch) return next(ApiError.BadRequest("Password does not match!"));

    const adminData = adminDto(admin);

    adminData.accessToken = JsonWebToken.sign(adminData, config.SECRET_KEY);

    res.status(OK).json({
      status: OK,
      message: `Login successfully.`,
      data: adminData,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogOut = async (
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

export const adminCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const uuid = Date.now().toString();

    const last4Str = String(uuid).slice(-8);
    body.uId = "SONAX" + last4Str;

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
      if (body.sponserId) {
        await UserSponserByModel.create({
          userId: user._id,
          sponserId: body.sponserId,
          placement: body.placement,
        });
      }
    }

    const sms = sendSms();
    console.log(sms);

    res.status(OK).json({
      status: OK,
      message: `Logout successfully.`,
      user,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
