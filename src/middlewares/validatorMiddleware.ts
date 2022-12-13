import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ApiError } from "../errors";

const mobileSchema = Joi.object({
  mobile: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required(),
});

const mobileVerifySchema = Joi.object({
  otp: Joi.number().integer().min(1000).max(9999).required(),
});

const adminSchema = Joi.object({
  mobile: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required(),
  otp: Joi.number().integer().min(1000).max(9999).required(),
});

export const mobileValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = {
      mobile: req.body.mobile,
    };

    const { error } = mobileSchema.validate(payload);
    if (error) {
      return next(ApiError.BadRequest(errorHandler(error).toString()))
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const mobileVerifyValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = {
      otp: req.body.otp,
    };

    const { error } = mobileVerifySchema.validate(payload);
    if (error) {
      return next(ApiError.BadRequest(errorHandler(error).toString()))
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const errorHandler = (err: any) => {
  const error = [];
  for (const x in err.details) {
    error.push(err.details[x].message);
  }
  return error;
};
