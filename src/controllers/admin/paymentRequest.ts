import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import {
  PaymentRequestModel,
  RewardsModel,
  UserModel,
} from "../../database/models";
import { WalletHistoryModel } from "../../database/models/walletHistory";
import { ApiError } from "../../errors";
import { IAuthAdmin } from "../../interfaces";

export const getPaymentRequest = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests = await PaymentRequestModel.find()
      .populate("requestBy", "uId firstName lastName")
      .sort({ createdAt: 1 });

    res.status(OK).json({
      status: OK,
      message: `successfully.`,
      requests,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePaymentRequest = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const request = await PaymentRequestModel.findById(id);
    if (!request) return next(ApiError.BadRequest("request not exist!"));

    await PaymentRequestModel.updateOne({ _id: id }, { status: "paid" });
    await UserModel.updateOne(
      { _id: request?.requestBy },
      { $inc: { wallet: `-${request?.payment}` } }
    );
    await WalletHistoryModel.create({
      userId: request?.requestBy,
      paymentBy: req.userId,
      levelBy: 0,
      payment: request?.payment,
      paymentType: "withdrawal",
      transactionType: "withdrawal",
    });

    res.status(OK).json({
      status: OK,
      message: `successfully.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
