import { Schema, model, Types } from "mongoose";
import { IInstallments } from "../../interfaces";

// Create the schema
const installmentsSchema = new Schema<IInstallments>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    price: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    month: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const InstallmentsModel = model<IInstallments>("Installment", installmentsSchema);
