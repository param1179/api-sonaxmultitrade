"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var rewardSchema = new mongoose_1.Schema({
    rewardLevel: {
        type: String,
        require: true,
    },
    onPairs: {
        type: Number,
        require: true,
    },
    reward: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.RewardsModel = (0, mongoose_1.model)("Reward", rewardSchema);
