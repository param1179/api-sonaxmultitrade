import express from "express";
import { UserCtrl } from "../../controllers";
import { auth, createUser, userLoginSchema, validate } from "../../middlewares";

const router = express.Router();

router.put("/login", validate(userLoginSchema), UserCtrl.userLogIn);
router.get("/logOut", UserCtrl.userLogOut);
router.get("/profile", auth, UserCtrl.getProfile);
router.get("/packages", auth, UserCtrl.packages);
router.get("/teams", auth, UserCtrl.teams);
router.post("/add", validate(createUser), UserCtrl.createUser);


export { router as usersRouter };
