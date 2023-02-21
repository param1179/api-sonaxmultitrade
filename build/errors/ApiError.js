"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
var consts_1 = require("../consts");
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(status, message, error) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.error = error;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    ApiError.UnauthorizedError = function (message, error) {
        if (message === void 0) { message = 'Unauthorized Error'; }
        if (error === void 0) { error = 'Unauthorized'; }
        return new ApiError(consts_1.UNAUTHORIZED, message, error);
    };
    ApiError.ForbiddenError = function (message, error) {
        if (message === void 0) { message = 'Forbidden Error'; }
        if (error === void 0) { error = 'Forbidden'; }
        return new ApiError(consts_1.FORBIDDEN, message, error);
    };
    ApiError.BadRequest = function (message, error) {
        if (error === void 0) { error = 'Bad Request'; }
        return new ApiError(consts_1.BAD_REQUEST, message, error);
    };
    return ApiError;
}(Error));
exports.ApiError = ApiError;
