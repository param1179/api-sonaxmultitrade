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
    const count = await InstallmentsModel.countDocuments({
      userId: payment?.userId,
      status: true,
    });

    let numberof: string;

    switch (count) {
      case 1:
        numberof = "1st";
        break;

      case 2:
        numberof = "2nd";
        break;

      case 3:
        numberof = "3rd";
        break;

      default:
        numberof = `${count}th`;
        break;
    }

    const user = await UserModel.findById(payment.userId);

    await sendOtp(
      `+91${user?.mobile}`,
      `Welcome to Sonax Multitrade. "${user?.uId}" your ${numberof} installment of Rs.${payment.price} has succeeded. You can login on https://sonaxmultitrade.in . Thank you.`
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
