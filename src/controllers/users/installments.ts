import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { InstallmentsModel, UserModel } from "../../database/models";
import { IAuth } from "../../interfaces";

export const getInstallments = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = req
    const installments = await InstallmentsModel.find({userId: userId});
    const user = await UserModel.findOne({_id: userId});

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: installments,
      points: user?.points,
      wallet: user?.wallet,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
