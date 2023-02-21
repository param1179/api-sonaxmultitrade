"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNomineeModel = void 0;
var mongoose_1 = require("mongoose");
// Create the schema
var userNomineeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    dob: {
        type: String,
        require: true,
    },
    relation: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
// Create and export user model
exports.UserNomineeModel = (0, mongoose_1.model)("UserNominee", userNomineeSchema);
