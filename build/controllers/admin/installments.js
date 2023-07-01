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
exports.updatePoints = exports.updatePayment = exports.getInstallments = void 0;
var consts_1 = require("../../consts");
var models_1 = require("../../database/models");
var walletHistory_1 = require("../../database/models/walletHistory");
var errors_1 = require("../../errors");
var services_1 = require("../../services");
var getInstallments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, installments, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, models_1.InstallmentsModel.find({ userId: id }).sort({
                        createdAt: 1,
                    })];
            case 1:
                installments = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully fetched.",
                    data: installments,
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
exports.getInstallments = getInstallments;
var updatePayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, payment, directBY, count, numberof, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                id = req.params.id;
                return [4 /*yield*/, models_1.InstallmentsModel.findById(id)];
            case 1:
                payment = _a.sent();
                if (!payment)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("payment not exist!"))];
                return [4 /*yield*/, models_1.InstallmentsModel.updateOne({ _id: id }, { status: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, models_1.UserModel.updateOne({ _id: payment === null || payment === void 0 ? void 0 : payment.userId }, { $inc: { points: 100 } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, models_1.UserSponserByModel.findOne({ "childs.childId": payment === null || payment === void 0 ? void 0 : payment.userId }, {
                        _id: 0,
                        childs: {
                            $elemMatch: { childId: payment === null || payment === void 0 ? void 0 : payment.userId },
                        },
                    })];
            case 4:
                directBY = _a.sent();
                if (!(directBY && (directBY === null || directBY === void 0 ? void 0 : directBY.childs[0].sponserBy))) return [3 /*break*/, 7];
                return [4 /*yield*/, models_1.UserModel.findByIdAndUpdate(directBY === null || directBY === void 0 ? void 0 : directBY.childs[0].sponserBy, {
                        $inc: { wallet: 100 },
                    })];
            case 5:
                _a.sent();
                return [4 /*yield*/, walletHistory_1.WalletHistoryModel.create({
                        userId: directBY === null || directBY === void 0 ? void 0 : directBY.childs[0].sponserBy,
                        paymentBy: payment === null || payment === void 0 ? void 0 : payment.userId,
                        levelBy: 0,
                        payment: 100,
                        paymentType: "regularEmi",
                        transactionType: "deposite",
                    })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, models_1.InstallmentsModel.countDocuments({
                    userId: payment === null || payment === void 0 ? void 0 : payment.userId,
                    status: true,
                })];
            case 8:
                count = _a.sent();
                numberof = void 0;
                switch (count) {
                    case 1:
                        numberof = "1st";
                        break;
                    case 2:
                        numberof = "2nd";
                        break;
                    case 3:
                        numberof = "3rd";
                        break;
                    default:
                        numberof = "".concat(count, "th");
                        break;
                }
                return [4 /*yield*/, models_1.UserModel.findById(payment.userId)];
            case 9:
                user = _a.sent();
                return [4 /*yield*/, (0, services_1.sendOtp)("+91".concat(user === null || user === void 0 ? void 0 : user.mobile), "Welcome to Sonax Multitrade. \"".concat(user === null || user === void 0 ? void 0 : user.uId, "\" your ").concat(numberof, " installment of Rs.").concat(payment.price, " has succeeded. You can login on https://sonaxmultitrade.in . Thank you."))];
            case 10:
                _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully updated.",
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 12];
            case 11:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.updatePayment = updatePayment;
var updatePoints = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var payments, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.InstallmentsModel.aggregate([
                        { $match: { status: true } },
                        { $group: { _id: "$userId", count: { $sum: 1 } } },
                    ])];
            case 1:
                payments = _a.sent();
                payments.forEach(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var totalPoints;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                totalPoints = 100 * item.count;
                                return [4 /*yield*/, models_1.UserModel.updateOne({ _id: item._id }, { points: totalPoints })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "Successfully updated.",
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
exports.updatePoints = updatePoints;
