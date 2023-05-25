import { NextFunction, Request, Response } from "express";
import { OK } from "../../consts";
import {
  UserModel,
  UserNomineeModel,
  UserSponserByModel,
} from "../../database/models";
import { userProfileDto } from "../../dto";
import { IAuth } from "../../interfaces";

export const getProfile = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;

    const user = await UserModel.findById(userId);
    const userDto = userProfileDto(user);
    userDto.nominee = await UserNomineeModel.findOne({ userId: userId });
    userDto.sponserBY = await UserSponserByModel.find(
      { "childs.childId": userId },
      { _id: 0, childs: { $elemMatch: { childId: userId } } }
    ).populate({
      path: "childs.sponserBy",
      select: "firstName lastName uId email mobile",
    });
      
    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: userDto,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
