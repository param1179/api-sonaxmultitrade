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
    mobile: yup.number().integer().required(),
    email: yup.string().email().required(),
    password: yup.string().min(2).required(),
  }),
});

export const createRewards = yup.object({
  body: yup.object({
    rewardLevel: yup.string().required("Reward Level is require field!"),
    onPairs: yup.string().required("Pairs is require field!"),
    reward: yup.string().required("Reward name is require field!"),
  }),
});
