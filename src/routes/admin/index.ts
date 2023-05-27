import express from "express";
import { AdminCtrl } from "../../controllers";
import {
  validate,
  adminLoginSchema,
  createUser,
  authAdmin,
  createRewards,
  userChangePasswordSchemaByAdmin,
} from "../../middlewares";

const router = express.Router();

router.post("/signup", AdminCtrl.adminSignUp);
router.put("/login", validate(adminLoginSchema), AdminCtrl.adminLogIn);
router.get("/logOut", AdminCtrl.adminLogOut);
router.get("/profile", AdminCtrl.adminProfile);

//Users Actions by Admin
router.post("/users/add", authAdmin, validate(createUser), AdminCtrl.adminCreateUser);
router.post("/rewards", authAdmin, validate(createRewards), AdminCtrl.createRewards);
router.post("/changePassword/:id", authAdmin, validate(userChangePasswordSchemaByAdmin), AdminCtrl.changePAsswordByAdmin);
router.get("/rewards", authAdmin, AdminCtrl.getRewards);
router.get("/packages", authAdmin, AdminCtrl.packages);
router.get("/users", authAdmin, AdminCtrl.getUsers);
router.get("/users/list", authAdmin, AdminCtrl.getAllUsers);
router.get("/user/:id", authAdmin, AdminCtrl.updateUsers);
router.get("/sponser/:sid/:uid", authAdmin, AdminCtrl.updateSponser);
router.get("/info/:id", authAdmin, AdminCtrl.userInfo);
router.put("/user/:id", authAdmin, AdminCtrl.userUpdate);
router.get("/installments/:id", authAdmin, AdminCtrl.getInstallments);
router.get("/payment/:id", authAdmin, AdminCtrl.updatePayment);
router.get("/userTabs/:pId", authAdmin, AdminCtrl.getUserTabs);
router.get("/test", authAdmin, AdminCtrl.packagesUpdate);
router.get("/points", authAdmin, AdminCtrl.updatePoints);

export { router as adminRouter };
