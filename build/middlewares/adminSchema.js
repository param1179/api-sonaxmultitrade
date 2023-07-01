"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChangePasswordSchemaByAdmin = exports.createRewards = exports.createPaymentRequest = exports.createUser = exports.adminLoginSchema = void 0;
var yup = __importStar(require("yup"));
exports.adminLoginSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(2).required(),
    }),
});
exports.createUser = yup.object({
    body: yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        gender: yup.string().required(),
        dob: yup.date().required(),
        mobile: yup.number().integer().required(),
        email: yup.string().email().optional(),
        password: yup.string().min(2).required(),
    }),
});
exports.createPaymentRequest = yup.object({
    body: yup.object({
        paymentRequest: yup.number().required(),
    })
});
exports.createRewards = yup.object({
    body: yup.object({
        rewardLevel: yup.string().required("Reward Level is require field!"),
        onPairs: yup.string().required("Pairs is require field!"),
        reward: yup.string().required("Reward name is require field!"),
    }),
});
exports.userChangePasswordSchemaByAdmin = yup.object({
    body: yup.object({
        password: yup.string().max(15).required(),
    }),
});
