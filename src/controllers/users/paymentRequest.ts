import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import {
  PaymentRequestModel,
  RewardsModel,
  UserSponserByModel,
} from "../../database/models";
import { ApiError } from "../../errors";
import { IAuth } from "../../interfaces";

export const getPaymentRequest = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const requests = await PaymentRequestModel.find({ requestBy: userId }).sort(
      { createdAt: 1 }
    );

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

export const createPaymentRequest = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, user, body } = req;

    if (user && user?.wallet < body.paymentRequest)
      return next(ApiError.BadRequest("Your wallet balance is low!"));

    const request = await PaymentRequestModel.findOne({
      requestBy: userId,
      status: "pending",
    });

    if (request) return next(ApiError.BadRequest("Previous request already is in pending status!"));

    const left = await UserSponserByModel.findOne({
      childs: {
        $elemMatch: {
          sponserBy: userId,
          placement: "Left"
        },
      },
    });

    const right = await UserSponserByModel.findOne({
      childs: {
        $elemMatch: {
          sponserBy: userId,
          placement: "Right"
        },
      },
    });

    if (!left || !right)
      return next(ApiError.BadRequest("Direct two user required!"));

    await PaymentRequestModel.create({
      requestBy: userId,
      payment: body.paymentRequest,
      status: "pending",
    });

    res.status(OK).json({
      status: OK,
      message: `successfully created.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
