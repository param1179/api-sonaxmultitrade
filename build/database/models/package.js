"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var packageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        default: null,
    },
    months: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.PackagesModel = (0, mongoose_1.model)("Package", packageSchema);
