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
exports.getUserTabs = void 0;
var consts_1 = require("../../consts");
var models_1 = require("../../database/models");
var allIds = [];
var getUserTabs = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, position_1, teams, data, ids, childs, childss, active, inActive, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                userId = req.params.pId;
                position_1 = req.query.position;
                allIds = [];
                return [4 /*yield*/, models_1.UserSponserByModel.findOne({ parentId: userId })];
            case 1:
                teams = _a.sent();
                if (!(teams !== null)) return [3 /*break*/, 5];
                data = teams.childs.filter(function (res) { return res.placement === position_1; });
                ids = data.map(function (res) { return res.childId; });
                allIds = __spreadArray([], ids.flat(), true);
                return [4 /*yield*/, models_1.UserSponserByModel.findOne({
                        parentId: ids[0],
                    })];
            case 2:
                childs = _a.sent();
                if (!(childs !== null)) return [3 /*break*/, 5];
                return [4 /*yield*/, loopFunc(childs)];
            case 3:
                if (!_a.sent()) return [3 /*break*/, 5];
                return [4 /*yield*/, Promise.all(allIds.flat())];
            case 4:
                allIds = _a.sent();
                _a.label = 5;
            case 5: return [4 /*yield*/, models_1.UserModel.find({
                    _id: { $in: allIds },
                }).select("firstName lastName email uId isCompleted createdAt")];
            case 6:
                childss = _a.sent();
                active = childss.filter(function (res) { return res.isCompleted === true; }).length;
                inActive = childss.filter(function (res) { return res.isCompleted === false; }).length;
                res.status(consts_1.OK).json({
                    status: consts_1.OK,
                    message: "All Done",
                    total: childss.length,
                    active: active,
                    inActive: inActive,
                });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getUserTabs = getUserTabs;
function loopFunc(childs) {
    return __awaiter(this, void 0, void 0, function () {
        var ids, chids_1, hij, po;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ids = childs.childs.map(function (res) { return res.childId; });
                    allIds = __spreadArray(__spreadArray([], allIds, true), ids.flat(), true);
                    if (!(ids && ids.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, models_1.UserSponserByModel.find({
                            parentId: { $in: ids },
                        })];
                case 1:
                    chids_1 = _a.sent();
                    if (!Array.isArray(chids_1)) return [3 /*break*/, 3];
                    hij = chids_1
                        .map(function (outer) {
                        return outer.childs;
                    })
                        .flat();
                    po = {
                        childs: hij,
                    };
                    return [4 /*yield*/, loopFunc(po)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, loopFunc(chids_1)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 200);
                    _a.label = 4;
                case 4: return [2 /*return*/, true];
            }
        });
    });
}
