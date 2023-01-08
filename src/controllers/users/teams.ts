import { NextFunction, Response } from "express";
import { ObjectId } from "mongoose";
import { OK } from "../../consts";
import { PackagesModel, UserSponserByModel } from "../../database/models";
import { ApiError } from "../../errors";
import { IAuth } from "../../interfaces";
import { getChilren } from "../../services/userServices";

export const teams = async (req: IAuth, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.pId as unknown as ObjectId;

    const dat = await getchildData(userId);

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: dat,
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
    children = {
      childs: [
        {
          childId: {
            firstName: "Add User",
            _id: null,
          },
          placement: "Left",
        },
        {
          childId: {
            firstName: "Add User",
            _id: null,
          },
          placement: "Right",
        },
      ],
      parentId: userId,
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
      parentId: userId,
      placement: place !== "Right" ? "Right" : "Left",
    };
    children.parentId = userId,
    children.childs[1] = ch;
    return children;
  }
  if (children.childs.length === 2) {
    return children;
  }
}
