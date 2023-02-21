"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSponserByModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var userSponserBySchema = new mongoose_1.Schema({
    childs: [
        {
            placement: {
                type: String,
                require: true,
            },
            childId: {
                type: mongoose_1.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    parentId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    sponserBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.UserSponserByModel = (0, mongoose_1.model)("UserSponserBy", userSponserBySchema);
