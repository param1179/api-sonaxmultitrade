import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { PackagesModel, UserSponserByModel } from "../../database/models";
import { IAuth } from "../../interfaces";

export const teams = async (req: IAuth, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const teams = await UserSponserByModel.find({ sponserId: userId })
      .populate("userId", "firstName lastName email uId")
      .exec();

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: teams,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
