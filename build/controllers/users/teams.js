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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamList = exports.teamsDirect = exports.teams = void 0;
var consts_1 = require("../../consts");
var models_1 = require("../../database/models");
var userServices_1 = require("../../services/userServices");
var teams = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, direct, dat, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.params.pId;
                return [4 /*yield*/, models_1.UserSponserByModel.find({ sponserBy: userId })];
            case 1:
                direct = _a.sent();
                return [4 /*yield*/, getchildData(userId)];
            case 2:
                dat = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully fetched.",
                    data: dat,
                    direct: direct,
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
exports.teams = teams;
var teamsDirect = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, direct, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.userId;
                return [4 /*yield*/, models_1.UserSponserByModel.countDocuments({ "childs.sponserBy": userId }, { _id: 0, childs: { $elemMatch: { sponserBy: userId } } })];
            case 1:
                direct = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully fetched.",
                    direct: direct,
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
exports.teamsDirect = teamsDirect;
var teamList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, position_1, child_1, cobine_1, active, inActive, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.pId;
                position_1 = req.query.position;
                child_1 = [];
                cobine_1 = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
                    var dat, chi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getchildData(userId)];
                            case 1:
                                dat = _a.sent();
                                chi = dat.childs.filter(function (child) { return child.placement === position_1; });
                                if (!(chi[0].childId._id !== null)) return [3 /*break*/, 3];
                                child_1 = __spreadArray(__spreadArray([], child_1, true), [chi[0].childId], false);
                                return [4 /*yield*/, cobine_1(chi[0].childId._id)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, cobine_1(userId)];
            case 1:
                _a.sent();
                active = child_1.filter(function (res) { return res.isCompleted === true; }).length;
                inActive = child_1.filter(function (res) { return res.isCompleted === false; }).length;
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully fetched.",
                    data: child_1,
                    total: child_1.length,
                    active: active,
                    inActive: inActive,
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
exports.teamList = teamList;
function getchildData(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, chi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userServices_1.getChilren)(userId)];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, childArray(data, userId)];
                case 2:
                    chi = _a.sent();
                    return [2 /*return*/, chi];
            }
        });
    });
}
function childArray(children, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, ch, place;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!children) return [3 /*break*/, 2];
                    return [4 /*yield*/, models_1.UserModel.findById(userId).select("firstName lastName email uId isCompleted createdAt")];
                case 1:
                    user = _a.sent();
                    children = {
                        childs: [
                            {
                                childId: {
                                    firstName: "Add User",
                                    _id: null,
                                },
                                placement: "Left",
                            },
                            {
                                childId: {
                                    firstName: "Add User",
                                    _id: null,
                                },
                                placement: "Right",
                            },
                        ],
                        parentId: user,
                    };
                    return [2 /*return*/, children];
                case 2:
                    if (children.childs.length === 1) {
                        place = children.childs[0].placement;
                        ch = {
                            childId: {
                                firstName: "Add User",
                                _id: null,
                            },
                            parentId: userId,
                            placement: place !== "Right" ? "Right" : "Left",
                        };
                        children.childs[1] = ch;
                        return [2 /*return*/, children];
                    }
                    if (children.childs.length === 2) {
                        return [2 /*return*/, children];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
