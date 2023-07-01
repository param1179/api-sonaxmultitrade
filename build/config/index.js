"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    PORT: process.env.PORT || 5000,
    DATABASE: process.env.DATABASE || "rest-api",
    DB_USERNAME: process.env.DB_USERNAME || "rest-api",
    DB_PASSWORD: process.env.DB_PASSWORD || "rest-api",
    SECRET_KEY: process.env.SECRET_KEY || "",
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
    AWS_S3_REGION: process.env.AWS_S3_REGION || "",
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || "",
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || "",
    AWS_S3_NAME: process.env.AWS_S3_NAME || "",
    TWO_FACTOR_API_KEY: process.env.TWO_FACTOR_API_KEY || "",
};
