import express from "express";
import { AdminCtrl } from "../../controllers";
import { validate, adminLoginSchema, createUser } from "../../middlewares";

const router = express.Router();

router.post("/signup", AdminCtrl.adminSignUp);
router.put("/login", validate(adminLoginSchema), AdminCtrl.adminLogIn);
router.get("/logOut", AdminCtrl.adminLogOut);

//Users Actions by Admin
router.post("/users/add", validate(createUser), AdminCtrl.adminCreateUser);


export { router as adminRouter };
