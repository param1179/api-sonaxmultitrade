import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import {
  InstallmentsModel,
  UserModel,
  UserSponserByModel,
} from "../../database/models";
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
    const installments = await InstallmentsModel.find({ userId: id }).sort({
      createdAt: 1,
    });

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
    await UserModel.updateOne(
      { _id: payment?.userId },
      { $inc: { points: 100 } }
    );

    const directBY = await UserSponserByModel.findOne(
      { "childs.childId": payment?.userId },
      {
        _id: 0,
        childs: {
          $elemMatch: { childId: payment?.userId },
        },
      }
    );

    if (directBY && directBY?.childs[0].sponserBy) {
      await UserModel.findByIdAndUpdate(directBY?.childs[0].sponserBy, {
        $inc: { wallet: 100 },
      });
    }
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

export const updatePoints = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const payments = await InstallmentsModel.aggregate([
      { $match: { status: true } },
      { $group: { _id: "$userId", count: { $sum: 1 } } },
    ]);
    payments.forEach(async (item: any) => {
      const totalPoints = 100 * item.count;
      await UserModel.updateOne({ _id: item._id }, { points: totalPoints });
    });

    res.status(OK).json({
      status: OK,
      message: `Successfully updated.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
