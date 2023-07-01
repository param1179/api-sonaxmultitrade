"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRequestModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var paymentRequestSchema = new mongoose_1.Schema({
    requestBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    payment: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.PaymentRequestModel = (0, mongoose_1.model)("PaymentRequest", paymentRequestSchema);
