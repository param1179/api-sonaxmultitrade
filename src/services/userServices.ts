import { ObjectId } from "mongoose";
import { UserModel, UserSponserByModel } from "../database/models";

export const getChilren = async (pId: ObjectId) => {
  var populateQuery = [
    {
      path: "childs.childId",
      select: "firstName lastName email uId isCompleted",
    },
    { path: "parentId", select: "firstName lastName email uId isCompleted" },
  ];
  const teams = await UserSponserByModel.findOne({ parentId: pId })
    .populate(populateQuery)
    .exec();
  
  return teams;
};
