import express, { NextFunction, Request, Response } from "express";
import { OK } from "../consts";
import { getS3 } from "../helpers";
import { IAuth } from "../interfaces";
import { countries } from "../mockData";
import { adminRouter } from "./admin";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

router.use("/admin", adminRouter);
router.use(
  "/countries",
  async (req: IAuth, res: Response, next: NextFunction) => {
    try {
      const countriesList = countries;
      res.status(OK).json({
        status: OK,
        message: `Successfull!`,
        countriesList,
        endpoint: req.originalUrl,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router as routes };
