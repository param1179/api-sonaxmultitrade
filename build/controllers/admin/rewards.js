"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteReward = exports.getRewards = exports.getUserRewards = exports.createUserRewards = exports.createRewards = void 0;
var consts_1 = require("../../consts");
var models_1 = require("../../database/models");
var createRewards = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, reward, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                body = req.body;
                return [4 /*yield*/, models_1.RewardsModel.create(body)];
            case 1:
                reward = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully created.",
                    reward: reward,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createRewards = createRewards;
var createUserRewards = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, id, reward, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                body = req.body;
                id = req.params.id;
                return [4 /*yield*/, models_1.UserRewardsModel.create(__assign(__assign({}, body), { userId: id }))];
            case 1:
                reward = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully created.",
                    reward: reward,
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
exports.createUserRewards = createUserRewards;
var getUserRewards = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, total_1, rewards, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                total_1 = 0;
                return [4 /*yield*/, models_1.UserRewardsModel.find({ userId: id }).sort({
                        createdAt: 1,
                    })];
            case 1:
                rewards = _a.sent();
                rewards.forEach(function (rew) {
                    total_1 += rew.price;
                });
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully.",
                    rewards: rewards,
                    total: total_1,
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
exports.getUserRewards = getUserRewards;
var getRewards = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rewards, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.RewardsModel.find().sort({ createdAt: 1 })];
            case 1:
                rewards = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully.",
                    rewards: rewards,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRewards = getRewards;
var deleteReward = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rewards, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, models_1.RewardsModel.findByIdAndDelete(id)];
            case 1:
                rewards = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully deleted.",
                    rewards: rewards,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteReward = deleteReward;
