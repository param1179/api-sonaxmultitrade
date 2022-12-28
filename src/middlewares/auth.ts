import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";
import { IAuth, IAuthAdmin } from "../interfaces";
import { AdminModel, UserModel } from "../database/models";
import { decode, verifyToken } from "./jwt";

export const auth = async (
    req: IAuth,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = decode(req);
      if (!token) return next(ApiError.UnauthorizedError());
  
      const verifiedData: any = await verifyToken(token);
      const userId = verifiedData._id;
  
      const user = await UserModel.findById(userId);
      if (!user) return next(ApiError.ForbiddenError());
  
      req.userId = user._id;
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };

  export const authAdmin = async (
    req: IAuthAdmin,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = decode(req);
      if (!token) return next(ApiError.UnauthorizedError());
  
      const verifiedData: any = await verifyToken(token);
      
      const userId = verifiedData._id;
  
      const admin = await AdminModel.findById(userId);
      if (!admin) return next(ApiError.ForbiddenError());
  
      req.userId = admin._id;
      req.admin = admin;
      next();
    } catch (error) {
      next(error);
    }
  };