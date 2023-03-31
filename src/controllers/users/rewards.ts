import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { RewardsModel } from "../../database/models";
import { IAuthAdmin } from "../../interfaces";

export const getRewards = async (
    req: IAuthAdmin,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rewards = await RewardsModel.find();
  
      res.status(OK).json({
        status: OK,
        message: `successfully.`,
        rewards,
        endpoint: req.originalUrl,
      });
    } catch (error) {
      next(error);
    }
  };
