import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { InstallmentsModel, UserModel } from "../../database/models";
import { WalletHistoryModel } from "../../database/models/walletHistory";
import { IAuth } from "../../interfaces";

export const getInstallments = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = req
    const installments = await InstallmentsModel.find({userId: userId}).sort({createdAt: 1});
    const user = await UserModel.findOne({_id: userId});
    const walletHistory = await WalletHistoryModel.find({userId: userId}).populate("paymentBy", "uId firstName lastName").sort({createdAt: -1})

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: installments,
      points: user?.points,
      wallet: user?.wallet,
      walletHistory,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
