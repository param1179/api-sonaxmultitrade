import { NextFunction, Response } from "express";
import { ObjectId } from "mongoose";
import { OK } from "../../consts";
import { PackagesModel, UserSponserByModel } from "../../database/models";
import { ApiError } from "../../errors";
import { IAuth } from "../../interfaces";
import { getChilren } from "../../services/userServices";

export const teams = async (req: IAuth, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId as unknown as ObjectId;
    var children: any = [];
    children = await getChilren(userId);
    if (children.length === 0) {
      children = [
        {
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
        },
      ];
    }
    if (children[0].childs.length === 1) {
      children[0].childs[1] = {
        childId: {
          firstName: "Add User",
          _id: null,
        },
        placement: "---",
      };
    }
    if (children[0].childs.length === 0) {
      children[0].childs[0] = {
        childId: {
          firstName: "Add User",
          _id: null,
        },
        placement: "---",
      };
      children[0].childs[1] = {
        childId: {
          firstName: "Add User",
          _id: null,
        },
        placement: "---",
      };
    }

    res.status(OK).json({
      status: OK,
      message: `Successfully fetched.`,
      data: children,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
