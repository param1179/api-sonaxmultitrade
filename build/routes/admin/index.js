"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../../controllers");
var middlewares_1 = require("../../middlewares");
var router = express_1.default.Router();
exports.adminRouter = router;
router.post("/signup", controllers_1.AdminCtrl.adminSignUp);
router.put("/login", (0, middlewares_1.validate)(middlewares_1.adminLoginSchema), controllers_1.AdminCtrl.adminLogIn);
router.get("/logOut", controllers_1.AdminCtrl.adminLogOut);
router.get("/profile", controllers_1.AdminCtrl.adminProfile);
//Users Actions by Admin
router.post("/users/add", middlewares_1.authAdmin, (0, middlewares_1.validate)(middlewares_1.createUser), controllers_1.AdminCtrl.adminCreateUser);
router.post("/rewards", middlewares_1.authAdmin, (0, middlewares_1.validate)(middlewares_1.createRewards), controllers_1.AdminCtrl.createRewards);
router.get("/rewards", middlewares_1.authAdmin, controllers_1.AdminCtrl.getRewards);
router.get("/packages", middlewares_1.authAdmin, controllers_1.AdminCtrl.packages);
router.get("/users", middlewares_1.authAdmin, controllers_1.AdminCtrl.getUsers);
router.get("/users/list", middlewares_1.authAdmin, controllers_1.AdminCtrl.getAllUsers);
router.get("/user/:id", middlewares_1.authAdmin, controllers_1.AdminCtrl.updateUsers);
router.get("/info/:id", middlewares_1.authAdmin, controllers_1.AdminCtrl.userInfo);
router.put("/user/:id", middlewares_1.authAdmin, controllers_1.AdminCtrl.userUpdate);
router.get("/installments/:id", middlewares_1.authAdmin, controllers_1.AdminCtrl.getInstallments);
router.get("/payment/:id", middlewares_1.authAdmin, controllers_1.AdminCtrl.updatePayment);
router.get("/userTabs/:pId", middlewares_1.authAdmin, controllers_1.AdminCtrl.getUserTabs);
router.get("/test", middlewares_1.authAdmin, controllers_1.AdminCtrl.packagesUpdate);
