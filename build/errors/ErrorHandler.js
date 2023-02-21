"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var ErrorHandler = function (error, req, res, next) {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || error,
        error: error.error || 'Internal Server Error',
    });
};
exports.ErrorHandler = ErrorHandler;
