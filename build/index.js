"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes");
var database_1 = require("./database");
var config_1 = require("./config");
var path_1 = __importDefault(require("path"));
var errors_1 = require("./errors");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var app = (0, express_1.default)();
var PORT = config_1.config.PORT;
(0, database_1.connect)();
app.use((0, express_fileupload_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api", routes_1.routes);
app.use(errors_1.ErrorHandler);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../web-sonaxmultitrade/build")));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, "../../web-sonaxmultitrade/build", "index.html"));
});
app.listen(PORT, function () {
    console.info("server is listening on port ".concat(PORT));
});
