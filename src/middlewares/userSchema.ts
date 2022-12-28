import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const userLoginSchema = yup.object({
  body: yup.object({
    uId: yup.string().required(),
    password: yup.string().min(2).required(),
  }),
});
