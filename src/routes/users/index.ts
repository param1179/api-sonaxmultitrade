import express from "express";
import { UserCtrl } from "../../controllers";
import { auth, createUser, userChangePasswordSchema, userLoginSchema, validate } from "../../middlewares";

const router = express.Router();

router.put("/login", validate(userLoginSchema), UserCtrl.userLogIn);
router.get("/logOut", UserCtrl.userLogOut);
router.get("/profile", auth, UserCtrl.getProfile);
router.get("/packages", auth, UserCtrl.packages);
router.get("/teams/:pId", auth, UserCtrl.teams);
router.get("/direct", auth, UserCtrl.teamsDirect);
router.get("/teamList/:pId", auth, UserCtrl.getUserTabs);
router.post("/add", auth, validate(createUser), UserCtrl.createUser);
router.post("/register", auth, validate(createUser), UserCtrl.createUserDirect);
router.get("/installments", auth, UserCtrl.getInstallments);
router.get("/rewards", auth, UserCtrl.getRewards);
router.post("/changePassword", auth, validate(userChangePasswordSchema), UserCtrl.changePAssword);


export { router as usersRouter };
