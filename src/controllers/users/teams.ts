import { NextFunction, Response } from "express";
import { ObjectId } from "mongoose";
import { OK } from "../../consts";
import {
  PackagesModel,
  UserModel,
  UserSponserByModel,
} from "../../database/models";
import { ApiError } from "../../errors";
import { IAuth } from "../../interfaces";
import { getChilren } from "../../services/userServices";

export const teams = async (req: IAuth, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.pId as unknown as ObjectId;
    const direct = await UserSponserByModel.find({ sponserBy: userId });
    const dat = await getchildData(userId);

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: dat,
      direct,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const teamsDirect = async (req: IAuth, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const direct = await UserSponserByModel.find(
      { "childs.sponserBy": userId },
      { _id: 0, childs: { $elemMatch: { sponserBy: userId } } }
    ).populate("childs.childId", "uId firstName lastName createdAt isCompleted")

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      direct,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const teamList = async (
  req: IAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.pId as unknown as ObjectId;
    const { position } = req.query;
    let child: any = [];

    const cobine = async (userId: any) => {
      const dat = await getchildData(userId);
      const chi = dat.childs.filter(
        (child: any) => child.placement === position
      );
      if (chi[0].childId._id !== null) {
        child = [...child, chi[0].childId];
        await cobine(chi[0].childId._id);
      }
    };
    await cobine(userId);

    const active = child.filter((res: any) => res.isCompleted === true).length;
    const inActive = child.filter((res: any) => res.isCompleted === false).length;

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: child,
      total: child.length,
      active,
      inActive,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

async function getchildData(userId: any) {
  const data = await getChilren(userId);
  const chi = await childArray(data, userId);
  return chi;
}

async function childArray(children: any, userId: any) {
  if (!children) {
    const user = await UserModel.findById(userId).select(
      "firstName lastName email uId isCompleted createdAt"
    );
    
    children = {
      childs: [
        {
          childId: {
            firstName: "Add User",
            _id: null,
          },
          parentId: userId,
          placement: "Left",
        },
        {
          childId: {
            firstName: "Add User",
            _id: null,
          },
          parentId: userId,
          placement: "Right",
        },
      ],
      parentId: user,
    };

    return children;
  }
  if (children.childs.length === 1) {
    var ch: any;
    const place = children.childs[0].placement;
    ch = {
      childId: {
        firstName: "Add User",
        _id: null,
      },
      parentId: children.childs[0].parentId._id,
      placement: place !== "Right" ? "Right" : "Left",
    };
    children.childs[1] = ch;
    return children;
  }
  if (children.childs.length === 2) {
    return children;
  }
}
