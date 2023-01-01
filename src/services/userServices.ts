import { ObjectId } from "mongoose";
import { UserSponserByModel } from "../database/models";

export const getChilren = async (_id: ObjectId) => {
  const teams = await UserSponserByModel.find({ sponserBy: _id })
    .populate("childs.childId", "firstName lastName email uId")
    .exec();
  return teams;
};
