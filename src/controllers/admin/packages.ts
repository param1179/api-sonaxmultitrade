import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import { OK } from "../../consts";
import { PackagesModel, UserModel } from "../../database/models";
import { IAuthAdmin } from "../../interfaces";

export const packages = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const packages = await PackagesModel.find();

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: packages,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const packagesUpdate = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
     await UserModel.updateMany({packageId: null}, {packageId: new Types.ObjectId('63bfde4bf7516270b60f91f6')});

    res.status(OK).json({
      status: OK,
      message: `Successfully updated.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
