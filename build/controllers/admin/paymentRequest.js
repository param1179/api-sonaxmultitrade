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
exports.updatePaymentRequest = exports.getPaymentRequest = exports.getBusiness = void 0;
var consts_1 = require("../../consts");
var models_1 = require("../../database/models");
var walletHistory_1 = require("../../database/models/walletHistory");
var errors_1 = require("../../errors");
var getBusiness = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, from, _c, to, fresh, fromDate, toDate, users, installments, matched, ids, usersMonthly, monthlyBusiness, totalBusiness, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                _a = req.query, _b = _a.from, from = _b === void 0 ? new Date() : _b, _c = _a.to, to = _c === void 0 ? new Date() : _c;
                fromDate = new Date(from);
                toDate = new Date(to);
                toDate.setDate(toDate.getDate() + 1);
                return [4 /*yield*/, models_1.UserModel.countDocuments({ isCompleted: true })];
            case 1:
                users = _d.sent();
                return [4 /*yield*/, models_1.InstallmentsModel.find({ status: true })];
            case 2:
                installments = _d.sent();
                models_1.InstallmentsModel.collection
                    .aggregate([
                    {
                        $match: {
                            status: true,
                            createdAt: { $gte: fromDate, $lte: toDate },
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userDetails",
                        },
                    },
                    {
                        $unwind: "$userDetails",
                    },
                    {
                        $project: {
                            _id: 0,
                            firstName: "$userDetails.firstName",
                            lastName: "$userDetails.lastName",
                            uId: "$userDetails.uId",
                            createdAt: "$userDetails.createdAt",
                            price: 1,
                            updatedAt: 1,
                        },
                    },
                    {
                        $group: {
                            _id: "$userId",
                            userDetails: { $addToSet: "$$ROOT" },
                        },
                    },
                    {
                        $unwind: "$userDetails",
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$userDetails",
                        },
                    },
                ])
                    .toArray(function (err, result) {
                    if (err) {
                        console.error("Error while executing aggregate:", err);
                        return;
                    }
                    fresh = result;
                });
                return [4 /*yield*/, models_1.InstallmentsModel.find({
                        $and: [
                            { status: true },
                            { updatedAt: { $gte: fromDate } },
                            { updatedAt: { $lte: toDate } },
                        ],
                    })];
            case 3:
                matched = _d.sent();
                ids = matched
                    .map(function (user) { return user.userId; })
                    .filter(function (e, i, a) { return e !== a[i - 1]; });
                return [4 /*yield*/, models_1.UserModel.countDocuments({
                        _id: {
                            $in: ids,
                        },
                    })];
            case 4:
                usersMonthly = _d.sent();
                monthlyBusiness = 0;
                matched.forEach(function (element) {
                    monthlyBusiness += Number(element.price);
                });
                totalBusiness = 0;
                installments.forEach(function (element) {
                    totalBusiness += Number(element.price);
                });
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully.",
                    totalBusiness: totalBusiness,
                    monthlyBusiness: monthlyBusiness,
                    users: users,
                    usersMonthly: usersMonthly,
                    fresh: fresh,
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _d.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getBusiness = getBusiness;
var getPaymentRequest = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var requests, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.PaymentRequestModel.find()
                        .populate("requestBy", "uId firstName lastName")
                        .sort({ createdAt: 1 })];
            case 1:
                requests = _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully.",
                    requests: requests,
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
exports.getPaymentRequest = getPaymentRequest;
var updatePaymentRequest = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, request, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                return [4 /*yield*/, models_1.PaymentRequestModel.findById(id)];
            case 1:
                request = _a.sent();
                if (!request)
                    return [2 /*return*/, next(errors_1.ApiError.BadRequest("request not exist!"))];
                return [4 /*yield*/, models_1.PaymentRequestModel.updateOne({ _id: id }, { status: "paid" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, models_1.UserModel.updateOne({ _id: request === null || request === void 0 ? void 0 : request.requestBy }, { $inc: { wallet: "-".concat(request === null || request === void 0 ? void 0 : request.payment), withdraw: request === null || request === void 0 ? void 0 : request.payment } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, walletHistory_1.WalletHistoryModel.create({
                        userId: request === null || request === void 0 ? void 0 : request.requestBy,
                        paymentBy: req.userId,
                        levelBy: 0,
                        payment: request === null || request === void 0 ? void 0 : request.payment,
                        paymentType: "withdrawal",
                        transactionType: "withdrawal",
                    })];
            case 4:
                _a.sent();
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "successfully.",
                    endpoint: req.originalUrl,
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updatePaymentRequest = updatePaymentRequest;
