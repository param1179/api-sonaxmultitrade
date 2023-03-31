import { NextFunction, Request, Response } from "express";
import { OK } from "../../consts";
import {
  InstallmentsModel,
  PackagesModel,
  UserModel,
  UserNomineeModel,
  UserSponserByModel,
} from "../../database/models";
import { adminUserDto } from "../../dto";
import { ApiError } from "../../errors";
import { ID } from "../../helpers";
import { IAuthAdmin } from "../../interfaces";
import { sendOtp } from "../../services";

export const getUsers = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      limit = 10,
      page = 1,
      search = "",
    } = req.query as unknown as {
      limit: number;
      page: number;
      search: string;
    };

    const users = await UserModel.find({
      uId: { $regex: search, $options: "i" },
    })
      .select("_id firstName lastName uId isCompleted")
      .skip((page - 1) * limit)
      .limit(limit);
    const totalUsers = await UserModel.find().countDocuments();

    res.status(OK).json({
      status: OK,
      message: `successfully.`,
      users,
      totalUsers,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find().select(
      "_id firstName lastName uId isCompleted"
    );

    res.status(OK).json({
      status: OK,
      message: `successfully.`,
      users,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const adminCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const totalUsers = (await UserModel.countDocuments()) + 1;
    const zero =
      totalUsers.toString().length === 1
        ? "000"
        : totalUsers.toString().length === 2
        ? "00"
        : totalUsers.toString().length === 3 && "0";
    body.uId = "SONAX" + zero + totalUsers;
    const user = await UserModel.create(body);

    if (user) {
      if (body.nomineeFirstName) {
        await UserNomineeModel.create({
          userId: user._id,
          firstName: body.nomineeFirstName,
          lastName: body.nomineeLastName,
          dob: body.nomineeDob,
          relation: body.nomineeRelation,
        });
      }

      if (body.sponserId) {
        const child = await UserSponserByModel.findOne({
          parentId: body.sponserId,
        }).sort({ createdAt: -1 });

        if (child && child.childs.length > 0) {
          const childPos = child?.childs.filter(
            (res) => res.placement === body.placement
          );
          if (childPos.length > 0) {
            await getLastChild(
              childPos[0].childId,
              body.placement,
              body.sponserId,
              user._id
            );
          } else {
            await UserSponserByModel.findOneAndUpdate(
              { parentId: child?.parentId },
              {
                $push: {
                  childs: {
                    childId: user._id,
                    placement: body.placement,
                  },
                },
              }
            );
          }
        } else {
          await getLastChild(
            body.sponserId,
            body.placement,
            body.sponserId,
            user._id
          );
        }
      }
    }

    await sendOtp(
      `+91${user.mobile}`,
      `Welcome to Sonax Multitrade. You are registered with us. Your user ID: "${user.uId}" and PASSWORD: "${body.password}". You can login on https://sonaxmultitrade.in . Thank you.`
    );

    res.status(OK).json({
      status: OK,
      message: `Created successfully.`,
      user,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const adminGetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find().then((usersT) => {
      const usersJoin = usersT.map(async (user: any) => {
        const userDto = adminUserDto(user);
        userDto.nominee = await UserNomineeModel.findOne({ userId: user._id });
        userDto.sponserBY = await UserSponserByModel.findOne({
          userId: user._id,
        });
        return userDto;
      });
      return usersJoin;
    });

    const usersData = await Promise.all(users);
    res.status(OK).json({
      status: OK,
      message: `Successfully.`,
      users: usersData,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

async function getLastChild(
  parentId: any,
  placement: string,
  sId: any,
  uId: any
) {
  const child = await UserSponserByModel.findOne({ parentId: parentId });
  if (child && child.childs.length > 0) {
    const childPos = child?.childs.filter((res) => res.placement === placement);
    if (childPos && childPos.length > 0) {
      await getLastChild(childPos[0].childId, placement, sId, uId);
    } else {
      await UserSponserByModel.findByIdAndUpdate(child._id, {
        $push: {
          childs: {
            childId: uId,
            placement: placement,
          },
        },
      });
    }
  } else {
    await UserSponserByModel.create({
      childs: {
        childId: uId,
        placement: placement,
      },
      parentId: parentId,
      sponserBy: sId,
    });
  }
}

export const updateUsers = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) return next(ApiError.BadRequest("user not exist!"));
    if (!user.packageId)
      return next(ApiError.BadRequest("package not selected!"));

    if (!(await InstallmentsModel.exists({ userId: id }))) {
      const { months, price }: any = await PackagesModel.findById(
        user.packageId
      );
      for (let index: number = 0; index < months; index++) {
        await InstallmentsModel.create({
          userId: id,
          price: price,
          status: index === 0 && true,
        });
      }
    }

    user.isCompleted = !user.isCompleted;
    await user.save();

    res.status(OK).json({
      status: OK,
      message: `Successfully updated.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const userInfo = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as unknown as {
      id: ID;
    };
    const user = await UserModel.findById(id).select("-password");

    if (!user) return next(ApiError.BadRequest("user not exist!"));

    res.status(OK).json({
      status: OK,
      message: `Successfully updated.`,
      user,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const userUpdate = async (
  req: IAuthAdmin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { id } = req.params as unknown as {
      id: ID;
    };

    const user = await UserModel.findById(id);

    if (!user) return next(ApiError.BadRequest("user not exist!"));

    await UserModel.updateOne({ _id: id }, body);

    res.status(OK).json({
      status: OK,
      message: `Successfully updated.`,
      endpoint: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
