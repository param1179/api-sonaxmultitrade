"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate_age = exports.buildFileName = void 0;
var path_1 = __importDefault(require("path"));
var buildFileName = function (fileName, folder, id) {
    var fileExtension = path_1.default.extname(fileName);
    return path_1.default.join(folder, "".concat(id), "".concat(Math.random()).concat(fileExtension));
};
exports.buildFileName = buildFileName;
function calculate_age(dob) {
    // console.log(dob.toString())
    // var diff_ms = Date.now() - dob.toString().getTime();
    // var age_dt = new Date(diff_ms); 
    return 3;
}
exports.calculate_age = calculate_age;
