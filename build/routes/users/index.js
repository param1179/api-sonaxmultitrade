"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../../controllers");
var middlewares_1 = require("../../middlewares");
var router = express_1.default.Router();
exports.usersRouter = router;
router.put("/login", (0, middlewares_1.validate)(middlewares_1.userLoginSchema), controllers_1.UserCtrl.userLogIn);
router.get("/logOut", controllers_1.UserCtrl.userLogOut);
router.get("/profile", middlewares_1.auth, controllers_1.UserCtrl.getProfile);
router.get("/packages", middlewares_1.auth, controllers_1.UserCtrl.packages);
router.get("/teams/:pId", middlewares_1.auth, controllers_1.UserCtrl.teams);
router.get("/direct", middlewares_1.auth, controllers_1.UserCtrl.teamsDirect);
router.get("/teamList/:pId", middlewares_1.auth, controllers_1.UserCtrl.getUserTabs);
router.post("/add", middlewares_1.auth, (0, middlewares_1.validate)(middlewares_1.createUser), controllers_1.UserCtrl.createUser);
router.post("/register", middlewares_1.auth, (0, middlewares_1.validate)(middlewares_1.createUser), controllers_1.UserCtrl.createUserDirect);
router.post("/request", middlewares_1.auth, (0, middlewares_1.validate)(middlewares_1.createPaymentRequest), controllers_1.UserCtrl.createPaymentRequest);
router.get("/installments", middlewares_1.auth, controllers_1.UserCtrl.getInstallments);
router.get("/rewards", middlewares_1.auth, controllers_1.UserCtrl.getRewards);
router.post("/changePassword", middlewares_1.auth, (0, middlewares_1.validate)(middlewares_1.userChangePasswordSchema), controllers_1.UserCtrl.changePAssword);
router.get("/get", middlewares_1.auth, controllers_1.UserCtrl.getUserProfile);
router.get("/getUser/:id", middlewares_1.auth, controllers_1.UserCtrl.getUser);
router.put("/update", middlewares_1.auth, controllers_1.UserCtrl.userUpdate);
