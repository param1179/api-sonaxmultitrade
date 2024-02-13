import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import {
  InstallmentsModel,
  PaymentRequestModel,
  RewardsModel,
  UserModel,
} from "../../database/models";
import { WalletHistoryModel } from "../../database/models/walletHistory";
import { ApiError } from "../../errors";
import { IAuthAdmin } from "../../interfaces";

export const getBusiness = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from = new Date(), to = new Date() } = req.query as unknown as {
      from: Date;
      to: Date;
    };
    var fresh: any;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setDate(toDate.getDate() + 1);

    const users = await UserModel.countDocuments({ isCompleted: true });

    const installments = await InstallmentsModel.find({ status: true });
    InstallmentsModel.collection
      .aggregate([
        {
          $match: {
            status: true,
            createdAt: { $gte: fromDate, $lte: toDate },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $project: {
            _id: 0,
            firstName: "$userDetails.firstName",
            lastName: "$userDetails.lastName",
            uId: "$userDetails.uId",
            createdAt: "$userDetails.createdAt",
            price: 1,
            updatedAt: 1,
          },
        },
        {
          $group: {
            _id: "$userId",
            userDetails: { $addToSet: "$$ROOT" },
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $replaceRoot: {
            newRoot: "$userDetails",
          },
        },
      ])
      .toArray(function (err, result) {
        if (err) {
          console.error("Error while executing aggregate:", err);
          return;
        }
        fresh = result;
      });

    const matched = await InstallmentsModel.find({
      $and: [
        { status: true },
        { updatedAt: { $gte: fromDate } },
        { updatedAt: { $lte: toDate } },
      ],
    });
    const ids = matched
      .map((user: any) => user.userId)
      .filter((e, i, a) => e !== a[i - 1]);

    const usersMonthly = await UserModel.countDocuments({
      _id: {
        $in: ids,
      },
    });
    var monthlyBusiness: number = 0;
    matched.forEach((element) => {
      monthlyBusiness += Number(element.price);
    });

    var totalBusiness: number = 0;
    installments.forEach((element) => {
      totalBusiness += Number(element.price);
    });

    res.status(OK).json({
      status: OK,
      message: `successfully.`,
      totalBusiness,
      monthlyBusiness,
      users,
      usersMonthly,
      fresh,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

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
      { $inc: { wallet: `-${request?.payment}`, withdraw: request?.payment } }
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
