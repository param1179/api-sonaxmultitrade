import { Schema, model, Types } from "mongoose";
import { string } from "yup/lib/locale";
import { IWalletHistory } from "../../interfaces";

// Create the schema
const walletHistorySchema = new Schema<IWalletHistory>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    paymentBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    levelBy: {
      type: Number,
      require: true,
    },
    payment: {
      type: String,
      default: null,
    },
    paymentType: {
      type: String,
      default: null,
    },
    transactionType: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const WalletHistoryModel = model<IWalletHistory>(
  "WalletHistory",
  walletHistorySchema
);
