import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { RewardsModel, UserRewardsModel } from "../../database/models";
import { IAuthAdmin } from "../../interfaces";

export const createRewards = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const reward = await RewardsModel.create(body);

    res.status(OK).json({
      status: OK,
      message: `successfully created.`,
      reward,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserRewards = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const reward = await UserRewardsModel.create({ ...body, userId: id });

    res.status(OK).json({
      status: OK,
      message: `successfully created.`,
      reward,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserRewards = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let total: number = 0;
    const rewards = await UserRewardsModel.find({ userId: id }).sort({
      createdAt: 1,
    });

    rewards.forEach((rew: any) => {
      total += rew.price;
    });

    res.status(OK).json({
      status: OK,
      message: `successfully.`,
      rewards,
      total,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const getRewards = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const rewards = await RewardsModel.find().sort({ createdAt: 1 });

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

export const deleteReward = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const rewards = await RewardsModel.findByIdAndDelete(id);

    res.status(OK).json({
      status: OK,
      message: `successfully deleted.`,
      rewards,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
