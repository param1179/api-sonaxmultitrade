import { Schema, model, Types } from "mongoose";
import { IUserSponserBy } from "../../interfaces";

// Create the schema
const userSponserBySchema = new Schema<IUserSponserBy>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    sponserId: {
      type: Types.ObjectId,
      ref: "User",
    },
    placement: {
      type: String,
      require: true
    }
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
