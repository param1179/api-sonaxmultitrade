import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const adminLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

export const adminLoginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };

    const { error } = adminLoginSchema.validate(payload);
    if (error) {
      res.status(406);
      return res.json({
        error: errorHandler(error),
      });
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
