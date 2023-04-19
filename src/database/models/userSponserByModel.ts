import { Schema, model, Types } from "mongoose";
import { IUserSponserBy } from "../../interfaces";

// Create the schema
const userSponserBySchema = new Schema<IUserSponserBy>(
  {
    childs: [
      {
        placement: {
          type: String,
          require: true,
        },
        childId: {
          type: Types.ObjectId,
          ref: "User",
        },
        sponserBy: {
          type: Types.ObjectId,
          ref: "User",
        },
      },
    ],
    parentId: {
      type: Types.ObjectId,
      ref: "User",
    },
    sponserBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const UserSponserByModel = model<IUserSponserBy>(
  "UserSponserBy",
  userSponserBySchema
);
