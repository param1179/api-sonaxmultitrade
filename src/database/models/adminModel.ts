import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IAdmin } from "../../interfaces";
const HASH_ROUNDS = 10;

// Create the schema
const AdminSchema = new Schema<IAdmin>(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum : ['superAdmin','admin'],
      default: 'admin'
  },
    photo: String,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

AdminSchema.pre("save", async function (next) {
  // here we need to retype 'this' because by default it is
  // of type Document from which the 'IUser' interface is inheriting
  // but the Document does not know about our password property
  const thisObj = this as IAdmin;

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

AdminSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
// Create and export user model
export const AdminModel = model<IAdmin>("Admin", AdminSchema);
