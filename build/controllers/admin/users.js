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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdate = exports.userInfo = exports.updateUsers = exports.adminGetUsers = exports.adminCreateUser = exports.getAllUsers = exports.getUsers = void 0;
var consts_1 = require("../../consts");
var models_1 = require("../../database/models");
var dto_1 = require("../../dto");
var errors_1 = require("../../errors");
var services_1 = require("../../services");
var getUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, limit, _c, page, _d, search, users, totalUsers, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                _a = req.query, _b = _a.limit, limit = _b === void 0 ? 10 : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.search, search = _d === void 0 ? "" : _d;
                return [4 /*yield*/, models_1.UserModel.find({
                        uId: { $regex: search, $options: "i" },
                    })
                        .select("_id firstName lastName uId isCompleted createdAt updatedAt")
                        .skip((page - 1) * limit)
                        .limit(limit)];
            case 1:
                users = _e.sent();
                return [4 /*yield*/, models_1.UserModel.find().countDocuments()];
            case 2:
                totalUsers = _e.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully.",
                    users: users,
                    totalUsers: totalUsers,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _e.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.UserModel.find().select("_id firstName lastName uId isCompleted")];
            case 1:
                users = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully.",
                    users: users,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var adminCreateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body_1, totalUsers, zero, user, child, childPos, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 14, , 15]);
                body_1 = req.body;
                return [4 /*yield*/, models_1.UserModel.countDocuments()];
            case 1:
                totalUsers = (_a.sent()) + 1;
                zero = totalUsers.toString().length === 1
                    ? "000"
                    : totalUsers.toString().length === 2
                        ? "00"
                        : totalUsers.toString().length === 3 && "0";
                body_1.uId = "SONAX" + zero + totalUsers;
                return [4 /*yield*/, models_1.UserModel.create(body_1)];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 12];
                if (!body_1.nomineeFirstName) return [3 /*break*/, 4];
                return [4 /*yield*/, models_1.UserNomineeModel.create({
                        userId: user._id,
                        firstName: body_1.nomineeFirstName,
                        lastName: body_1.nomineeLastName,
                        dob: body_1.nomineeDob,
                        relation: body_1.nomineeRelation,
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!body_1.sponserId) return [3 /*break*/, 12];
                return [4 /*yield*/, models_1.UserSponserByModel.findOne({
                        parentId: body_1.sponserId,
                    }).sort({ createdAt: -1 })];
            case 5:
                child = _a.sent();
                if (!(child && child.childs.length > 0)) return [3 /*break*/, 10];
                childPos = child === null || child === void 0 ? void 0 : child.childs.filter(function (res) { return res.placement === body_1.placement; });
                if (!(childPos.length > 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, getLastChild(childPos[0].childId, body_1.placement, body_1.sponserId, user._id)];
            case 6:
                _a.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, models_1.UserSponserByModel.findOneAndUpdate({ parentId: child === null || child === void 0 ? void 0 : child.parentId }, {
                    $push: {
                        childs: {
                            childId: user._id,
                            placement: body_1.placement,
                            sponserBy: body_1.sponserId,
                        },
                    },
                })];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, getLastChild(body_1.sponserId, body_1.placement, body_1.sponserId, user._id)];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12: return [4 /*yield*/, (0, services_1.sendOtp)("+91".concat(user.mobile), "Welcome to Sonax Multitrade. You are registered with us. Your user ID: \"".concat(user.uId, "\" and PASSWORD: \"").concat(body_1.password, "\". You can login on https://sonaxmultitrade.in . Thank you."))];
            case 13:
                _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Created successfully.",
                    user: user,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 15];
            case 14:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.adminCreateUser = adminCreateUser;
var adminGetUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, usersData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, models_1.UserModel.find().then(function (usersT) {
                        var usersJoin = usersT.map(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                            var userDto, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        userDto = (0, dto_1.adminUserDto)(user);
                                        _a = userDto;
                                        return [4 /*yield*/, models_1.UserNomineeModel.findOne({ userId: user._id })];
                                    case 1:
                                        _a.nominee = _c.sent();
                                        _b = userDto;
                                        return [4 /*yield*/, models_1.UserSponserByModel.findOne({
                                                userId: user._id,
                                            })];
                                    case 2:
                                        _b.sponserBY = _c.sent();
                                        return [2 /*return*/, userDto];
                                }
                            });
                        }); });
                        return usersJoin;
                    })];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, Promise.all(users)];
            case 2:
                usersData = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully.",
                    users: usersData,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.adminGetUsers = adminGetUsers;
function getLastChild(parentId, placement, sId, uId) {
    return __awaiter(this, void 0, void 0, function () {
        var child, childPos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.UserSponserByModel.findOne({ parentId: parentId })];
                case 1:
                    child = _a.sent();
                    if (!(child && child.childs.length > 0)) return [3 /*break*/, 6];
                    childPos = child === null || child === void 0 ? void 0 : child.childs.filter(function (res) { return res.placement === placement; });
                    if (!(childPos && childPos.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getLastChild(childPos[0].childId, placement, sId, uId)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, models_1.UserSponserByModel.findByIdAndUpdate(child._id, {
                        $push: {
                            childs: {
                                childId: uId,
                                placement: placement,
                                sponserBy: sId
                            },
                        },
                    })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, models_1.UserSponserByModel.create({
                        childs: {
                            childId: uId,
                            placement: placement,
                            sponserBy: sId,
                        },
                        parentId: parentId,
                        sponserBy: sId,
                    })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
var updateUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, _a, months, price, index, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                id = req.params.id;
                return [4 /*yield*/, models_1.UserModel.findById(id)];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("user not exist!"))];
                if (!user.packageId)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("package not selected!"))];
                return [4 /*yield*/, models_1.InstallmentsModel.exists({ userId: id })];
            case 2:
                if (!!(_b.sent())) return [3 /*break*/, 7];
                return [4 /*yield*/, models_1.PackagesModel.findById(user.packageId)];
            case 3:
                _a = _b.sent(), months = _a.months, price = _a.price;
                index = 0;
                _b.label = 4;
            case 4:
                if (!(index < months)) return [3 /*break*/, 7];
                return [4 /*yield*/, models_1.InstallmentsModel.create({
                        userId: id,
                        price: price,
                        status: index === 0 && true,
                    })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                index++;
                return [3 /*break*/, 4];
            case 7:
                user.isCompleted = !user.isCompleted;
                return [4 /*yield*/, user.save()];
            case 8:
                _b.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully updated.",
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 10];
            case 9:
                error_5 = _b.sent();
                next(error_5);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.updateUsers = updateUsers;
var userInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, models_1.UserModel.findById(id).select("-password")];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("user not exist!"))];
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully updated.",
                    user: user,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userInfo = userInfo;
var userUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, id, user, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                body = req.body;
                id = req.params.id;
                return [4 /*yield*/, models_1.UserModel.findById(id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("user not exist!"))];
                return [4 /*yield*/, models_1.UserModel.updateOne({ _id: id }, body)];
            case 2:
                _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully updated.",
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userUpdate = userUpdate;
