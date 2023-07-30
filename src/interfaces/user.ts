import { Request } from "express";
import { Document, ObjectId } from "mongoose";
import { IAuthAdmin } from "./admin";

// Create the interface
export interface IUser extends Document {
  uId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  spouseOrFather: string | null;
  activeUser: string;
  gender: string | null;
  password: string;
  mobile: number;
  otp: number | null;
  profilePhoto: string | null;
  dob: string | null;
  deviceToken: string | null;
  isCompleted: boolean;
  countryCode: string | null;
  locality: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  pin: string | null;
  country: string | null;
  wallet: number;
  withdraw: number;
  points: number;
  packageId: ObjectId | null;
  pId: ObjectId | null;
  validatePassword(password: string): boolean;
}

export interface IAuth extends Request {
  userId?: ObjectId;
  user?: IUser;
}

export interface IReqUploadPhotoAuth extends IAuth {
  files?: any;
}

export interface IReqUploadPhoto extends IAuthAdmin {
  files?: any;
}
