"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletHistoryModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var walletHistorySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    paymentBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    levelBy: {
        type: Number,
        require: true,
    },
    payment: {
        type: String,
        default: null,
    },
    paymentType: {
        type: String,
        default: null,
    },
    transactionType: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.WalletHistoryModel = (0, mongoose_1.model)("WalletHistory", walletHistorySchema);
