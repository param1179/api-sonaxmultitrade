import * as yup from "yup";

export const adminLoginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(2).required(),
  }),
});

export const createUser = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    gender: yup.string().required(),
    dob: yup.date().required(),
    plan: yup.string().required(),
    mobile: yup
      .number()
      .integer()
      .required(),
    email: yup.string().email().required(),
    password: yup.string().min(2).required(),
  }),
});
