import { NextFunction, Response } from "express";
import { OK } from "../../consts";
import { UserModel, UserNomineeModel } from "../../database/models";
import { ApiError } from "../../errors";
import { ID } from "../../helpers";
import { IAuth } from "../../interfaces";

export const getUserProfile = async (
    req: IAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId: id } = req;
      const user = await UserModel.findById(id).select("-password");
      const userNominee = await UserNomineeModel.find({ userId: id });
  
      const data = {
        user,
        nominee: userNominee && userNominee.length > 0 ? userNominee[0] : null,
      };
  
      res.status(OK).json({
        status: OK,
        message: `Successfully fetched.`,
        data,
        endpoint: req.originalUrl,
      });
    } catch (error) {
      next(error);
    }
  };

  export const userUpdate = async (
    req: IAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId: id, body } = req;
  
      const user = await UserModel.findById(id);
  
      if (!user) return next(ApiError.BadRequest("user not exist!"));
  
      await UserModel.updateOne({ _id: id }, body);
      await UserNomineeModel.updateOne(
        { userId: id },
        {
          firstName: body.nomineeFirstName,
          lastName: body.nomineeLastName,
          dob: body.nomineeDob,
          relation: body.nomineeRelation,
        }
      );
  
      res.status(OK).json({
        status: OK,
        message: `Successfully updated.`,
        endpoint: req.originalUrl,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getUser = async (
    req: IAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id).select("firstName lastName uId");
  
      res.status(OK).json({
        status: OK,
        message: `Successfully fetched.`,
        user,
        endpoint: req.originalUrl,
      });
    } catch (error) {
      next(error);
    }
  };