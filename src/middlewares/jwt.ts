import { NextFunction, Request, Response } from "express";
import JsonWebToken from "jsonwebtoken";
import { config } from "../config";
import { ApiError } from "../errors";

export const decode = (req: Request) => {
  if (req.headers["authorization"] === void 0) {
    return false;
  }
  const accessToken = req.headers["authorization"].split(" ");
  if (accessToken[0] !== "Bearer") {
    return false;
  }
  return accessToken;
};

export const verifyToken = async (accessToken: any) => {
  return JsonWebToken.verify(
    accessToken[1],
    config.SECRET_KEY,
    (err: any, decoded: any) => {
      if (err) {
        return null
      } else {
        return decoded;
      }
    }
  );
};
