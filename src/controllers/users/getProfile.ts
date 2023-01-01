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
    userDto.sponserBY = await UserSponserByModel.findOne({childs: { $elemMatch: { childId : userId}}})
      .populate("parentId childs.childId", "firstName lastName uId email mobile")
      .exec();
      
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
