import { ObjectId } from "mongoose";
import { UserSponserByModel } from "../database/models";

export const getChilren = async (pId: ObjectId) => {
  const teams = await UserSponserByModel.findOne({parentId: pId })
    .populate("childs.childId", "firstName lastName email uId")
    .exec();
  return teams;
};
