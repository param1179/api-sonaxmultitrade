import { Types } from "aws-sdk/clients/acm";
import { Request } from "express";
import { Document, ObjectId } from "mongoose";
import { ID } from "../helpers";

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
  role?: string;
  validatePassword(password: string): boolean;
}

export interface IAuthAdmin extends Request {
  userId?: ID;
  admin?: IAdmin;
}

export interface IUserSponserBy extends Request {
  childs:Array<any>;
  sponserBy?: ID;
  parentId?: ID;
}

export interface IPackages extends Request {
  name: string;
  price: string;
  months: string;
}

export interface IUserNominee extends Document {
  userId?: ID;
  firstName: string;
  lastName: string;
  dob: string;
  relation: string;
}
