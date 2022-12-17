import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const adminLoginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(2).required(),
  }),
});

export const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      next(err);
    }
  };
