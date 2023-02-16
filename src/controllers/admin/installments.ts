import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { InstallmentsModel, UserModel } from "../../database/models";
import { ApiError } from "../../errors";
import { IAuthAdmin } from "../../interfaces";
import { sendOtp } from "../../services";

export const getInstallments = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const installments = await InstallmentsModel.find({ userId: id });

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

export const updatePayment = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payment = await InstallmentsModel.findById(id);

    if (!payment) return next(ApiError.BadRequest("payment not exist!"));

    await InstallmentsModel.updateOne({ _id: id }, { status: true });

    const user = await UserModel.findById(payment.userId);

    await sendOtp(
      `+91${user?.mobile}`,
      `Welcome to Sonax Multitrade. "${user?.uId}" your payment has succeeded. You can login on https://sonaxmultitrade.in . Thank you.`
    );
    
    res.status(OK).json({
      status: OK,
      message: `Successfully updated.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
