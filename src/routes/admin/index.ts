import express from "express";
import { AdminCtrl } from "../../controllers";

import { authAdmin } from "../../middlewares";
import { adminLoginValidator } from "../../middlewares/adminMiddleware";

const router = express.Router();

router.post("/signup", AdminCtrl.adminSignUp);
router.put("/login", adminLoginValidator, AdminCtrl.adminLogIn);

export { router as adminRouter };
