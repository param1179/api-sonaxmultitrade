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
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var HASH_ROUNDS = 10;
// Create the schema
var UserSchema = new mongoose_1.Schema({
    uId: {
        type: String,
        require: true,
        unique: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        trim: true,
        enum: ["Male", "Female"],
    },
    activeUser: {
        type: String,
        trim: true,
        enum: ["Active", "Pending", "Inactive"],
        default: "Pending",
    },
    password: {
        type: String,
        default: "",
    },
    mobile: {
        type: Number,
        require: true,
    },
    deviceToken: {
        type: String,
        default: null,
    },
    otp: {
        type: Number,
        default: null,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    profilePhoto: {
        type: String,
        default: null,
    },
    dob: {
        type: String,
        default: null,
    },
    packageId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Package",
        default: null,
    },
    countryCode: {
        type: String,
        default: null,
    },
    locality: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    district: {
        type: String,
        default: null,
    },
    state: {
        type: String,
        default: null,
    },
    pin: {
        type: String,
        default: null,
    },
    country: {
        type: String,
        default: null,
    },
    pId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var thisObj, salt, _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    thisObj = this;
                    if (!this.isModified("password")) {
                        return [2 /*return*/, next()];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, bcryptjs_1.default.genSalt(HASH_ROUNDS)];
                case 2:
                    salt = _b.sent();
                    _a = thisObj;
                    return [4 /*yield*/, bcryptjs_1.default.hash(thisObj.password, salt)];
                case 3:
                    _a.password = _b.sent();
                    return [2 /*return*/, next()];
                case 4:
                    e_1 = _b.sent();
                    return [2 /*return*/, next()];
                case 5: return [2 /*return*/];
            }
        });
    });
});
UserSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, salt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = this.getUpdate();
                    if (!!user.password) return [3 /*break*/, 1];
                    next();
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, bcryptjs_1.default.genSalt(HASH_ROUNDS)];
                case 2:
                    salt = _b.sent();
                    _a = user;
                    return [4 /*yield*/, bcryptjs_1.default.hash(user.password, salt)];
                case 3:
                    _a.password = _b.sent();
                    next();
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
UserSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bcryptjs_1.default.compare(password, this.password)];
        });
    });
};
// Create and export user model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
