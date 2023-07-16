import { Schema, model, Types } from "mongoose";
import { IUser } from "../../interfaces";
import bcrypt from "bcryptjs";

const HASH_ROUNDS = 10;

// Create the schema
const UserSchema = new Schema<IUser>(
  {
    uId: {
      type: String,
      require: true,
      unique: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["Male", "Female"],
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
    packageId: {
      type: Types.ObjectId,
      ref: "Package",
      default: null,
    },
    countryCode: {
      type: String,
      default: null,
    },
    locality: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    district: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    pin: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    withdraw: {
      type: Number,
      default: 0,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    pId: {
      type: Types.ObjectId,
      ref: "User",
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

UserSchema.pre("findOneAndUpdate", async function (next) {
  const user = this.getUpdate() as IUser;
  if (!user.password) {
    next();
  } else {
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  }
});

UserSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
// Create and export user model
export const UserModel = model<IUser>("User", UserSchema);
