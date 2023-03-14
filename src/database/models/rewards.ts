import { Schema, model, Types } from "mongoose";
import { IRewards } from "../../interfaces";

// Create the schema
const rewardSchema = new Schema<IRewards>(
  {
    rewardLevel: {
      type: String,
      require: true,
    },
    onPairs: {
      type: Number,
      require: true,
    },
    reward: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const RewardsModel = model<IRewards>("Reward", rewardSchema);
