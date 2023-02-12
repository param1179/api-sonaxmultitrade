import express from "express";
import { AdminCtrl } from "../../controllers";
import {
  validate,
  adminLoginSchema,
  createUser,
  authAdmin,
} from "../../middlewares";

const router = express.Router();

router.post("/signup", AdminCtrl.adminSignUp);
router.put("/login", validate(adminLoginSchema), AdminCtrl.adminLogIn);
router.get("/logOut", AdminCtrl.adminLogOut);
router.get("/profile", AdminCtrl.adminProfile);

//Users Actions by Admin
router.post("/users/add", validate(createUser), AdminCtrl.adminCreateUser);
router.get("/packages", authAdmin, AdminCtrl.packages);
router.get("/users", authAdmin, AdminCtrl.getUsers);
router.get("/user/:id", authAdmin, AdminCtrl.updateUsers);

export { router as adminRouter };
