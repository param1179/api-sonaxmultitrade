import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import { OK } from "../../consts";
import {
  PackagesModel,
  UserModel,
  UserNomineeModel,
} from "../../database/models";
import { IAuthAdmin } from "../../interfaces";

export const getUserProfile = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password");
    const userNominee = await UserNomineeModel.find({ userId: id });

    const data = {
      user,
      nominee: userNominee && userNominee.length > 0 ? userNominee[0] : null,
    };

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
