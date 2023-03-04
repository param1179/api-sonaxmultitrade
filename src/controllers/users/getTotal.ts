import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { OK } from "../../consts";
import { UserModel, UserSponserByModel } from "../../database/models";
import { getChilren } from "../../services/userServices";
const arr = [
  {
    id: 1,
    child: [2, 3],
  },
  {
    id: 2,
    child: [],
  },
  {
    id: 3,
    child: [6, 7],
  },
  {
    id: 4,
    child: [],
  },
  {
    id: 5,
    child: [],
  },
  {
    id: 6,
    child: [],
  },
  {
    id: 7,
    child: [],
  },
];

let allIds: any = [];
let end = false;
export const testApi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.pId as unknown as ObjectId;
    const { position } = req.query;

    allIds = [];
    const teams: any = await UserSponserByModel.findOne({ parentId: userId });

    const data: Array<any> = teams.childs.filter(
      (res: any) => res.placement === position
    );

    const ids = data.map((res: any) => res.childId);

    allIds = [...ids.flat()];

    const childs: any = await UserSponserByModel.findOne({ parentId: ids[0] });
    if (childs !== null) {
      if (await bk(childs)) {
        allIds = await Promise.all(allIds.flat());
      }
    }

    let childss: Array<any> = await UserModel.find({
      _id: { $in: allIds },
    }).select("firstName lastName email uId isCompleted createdAt");
    const active = childss.filter(
      (res: any) => res.isCompleted === true
    ).length;
    const inActive = childss.filter(
      (res: any) => res.isCompleted === false
    ).length;
    res.status(OK).json({
      status: OK,
      message: "All Done",
      childss,
      total: childss.length,
      active,
      inActive,
    });
  } catch (error) {
    next(error);
  }
};

async function bk(childs: any) {
  const ids = childs.childs.map((res: any) => res.childId);

  allIds = [...allIds, ...ids.flat()];
  if (ids && ids.length) {
    const chids: any = await UserSponserByModel.find({
      parentId: { $in: ids },
    });
    if (Array.isArray(chids)) {
      const hij = chids
        .map((outer: any) => {
          return outer.childs;
        })
        .flat();

      const po: any = {
        childs: hij,
      };
      await bk(po);
    } else {
      setTimeout(async () => {
        await bk(chids);
      }, 200);
    }
  }

  return true;
}
