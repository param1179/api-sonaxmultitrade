import { Schema, model, Types } from "mongoose";
import { IPackages } from "../../interfaces";

// Create the schema
const packageSchema = new Schema<IPackages>(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      default: null,
    },
    months: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export user model
export const PackagesModel = model<IPackages>("Package", packageSchema);
