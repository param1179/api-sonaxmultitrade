import { Schema, model, Types } from "mongoose";
import { IUserNominee } from "../../interfaces";

// Create the schema
const userNomineeSchema = new Schema<IUserNominee>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    dob: {
      type: String,
      require: true,
    },
    relation: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const UserNomineeModel = model<IUserNominee>(
  "UserNominee",
  userNomineeSchema
);
