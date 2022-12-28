import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { PackagesModel } from "../../database/models";
import { IAuth } from "../../interfaces";

export const packages = async (
  req: IAuth,
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
