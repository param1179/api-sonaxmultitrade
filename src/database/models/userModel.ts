import { Schema, model } from "mongoose";
import { IUser } from "../../interfaces";
import bcrypt from "bcryptjs";

const HASH_ROUNDS = 10;

// Create the schema
const UserSchema = new Schema<IUser>(
  {
    uId: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["Girl", "Boy"],
    },
    activeUser: {
      type: String,
      trim: true,
      enum: ["Active", "Pending", "Inactive"],
      default: "Pending",
    },
    password: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      require: true,
    },
    deviceToken: {
      type: String,
      default: null,
    },
    otp: {
      type: Number,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    dob: {
      type: String,
      default: null,
    },
    countryCode: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  // here we need to retype 'this' because by default it is
  // of type Document from which the 'IUser' interface is inheriting
  // but the Document does not know about our password property
  const thisObj = this as IUser;

  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    thisObj.password = await bcrypt.hash(thisObj.password, salt);
    return next();
  } catch (e) {
    return next();
  }
});

UserSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
// Create and export user model
export const UserModel = model<IUser>("User", UserSchema);
