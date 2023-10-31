import { Schema, model, Types } from "mongoose";
import { IUserRewards } from "../../interfaces";

// Create the schema
const rewardSchema = new Schema<IUserRewards>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const UserRewardsModel = model<IUserRewards>("UserReward", rewardSchema);
