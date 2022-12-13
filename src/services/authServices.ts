import { ObjectId } from "mongoose";
import { IUser } from "../interfaces";
import { UserModel } from "../database/models";

export const createUser = async <T>(param: T) => {
  const user = await new UserModel(param);
  user.save();
  return user;
};

export const updateUser = async (id: ObjectId, param: any) => {
  const user = await UserModel.findByIdAndUpdate(id, param);
  return user;
};

export const findUserByMobile = async (mobile: string) => {
  const user = await UserModel.findOne({mobile: mobile});
  return user;
}

export const findUserById = async (id: ObjectId) => {
  const user = await UserModel.findById(id);
  return user;
}
