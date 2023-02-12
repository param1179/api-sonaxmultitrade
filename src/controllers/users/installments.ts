import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { InstallmentsModel } from "../../database/models";
import { IAuth } from "../../interfaces";

export const getInstallments = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = req
    const installments = await InstallmentsModel.find({userId: userId});

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: installments,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
