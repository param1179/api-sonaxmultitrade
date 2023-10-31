"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRewardsModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var rewardSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.UserRewardsModel = (0, mongoose_1.model)("UserReward", rewardSchema);
