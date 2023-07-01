import { Schema, model, Types } from "mongoose";
import { IPaymentRequest } from "../../interfaces";

// Create the schema
const paymentRequestSchema = new Schema<IPaymentRequest>(
  {
    requestBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    payment: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const PaymentRequestModel = model<IPaymentRequest>("PaymentRequest", paymentRequestSchema);
