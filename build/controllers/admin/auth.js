"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProfile = exports.adminLogOut = exports.adminLogIn = exports.adminSignUp = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../../config");
var consts_1 = require("../../consts");
var dto_1 = require("../../dto");
var errors_1 = require("../../errors");
var models_1 = require("../../database/models");
var adminSignUp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, admin, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                body = req.body;
                return [4 /*yield*/, models_1.AdminModel.findOne({ email: body.email })];
            case 1:
                admin = _a.sent();
                if (admin)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("Email already exist!"))];
                return [4 /*yield*/, models_1.AdminModel.create(body)];
            case 2:
                _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Register successfully.",
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.adminSignUp = adminSignUp;
var adminLogIn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, isMatch, adminData, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, models_1.AdminModel.findOne({ email: email })];
            case 1:
                admin = _b.sent();
                if (!admin)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("User not found!"))];
                return [4 /*yield*/, admin.validatePassword(password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("Password does not match!"))];
                adminData = (0, dto_1.adminDto)(admin);
                adminData.accessToken = jsonwebtoken_1.default.sign(adminData, config_1.config.SECRET_KEY);
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Login successfully.",
                    data: adminData,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.adminLogIn = adminLogIn;
var adminLogOut = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.status(consts_1.OK).json({
                status: consts_1.OK,
                message: "Logout successfully.",
                endpoint: req.originalUrl,
            });
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); };
exports.adminLogOut = adminLogOut;
var adminProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.userId;
                return [4 /*yield*/, models_1.AdminModel.findById(userId)];
            case 1:
                profile = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    data: {
                        admin: profile,
                    },
                    message: " successfully.",
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.adminProfile = adminProfile;
