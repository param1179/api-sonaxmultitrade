"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallmentsModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var installmentsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    price: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: null,
    },
    month: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.InstallmentsModel = (0, mongoose_1.model)("Installment", installmentsSchema);
