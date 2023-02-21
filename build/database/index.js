"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../config");
var connect = function () {
    var username = encodeURIComponent(config_1.config.DB_USERNAME);
    var password = encodeURIComponent(config_1.config.DB_PASSWORD);
    var URI = "mongodb+srv://".concat(username, ":").concat(password, "@sonaxmultitrade.sxouqhc.mongodb.net/").concat(config_1.config.DATABASE);
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    var connection = mongoose_1.default.connection;
    connection.once("open", function (err) {
        if (err)
            throw err;
        console.log("MongoDB database connection established successfully");
    });
};
exports.connect = connect;
