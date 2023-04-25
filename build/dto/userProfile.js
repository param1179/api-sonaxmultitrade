"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileDto = exports.adminUserDto = exports.userDto = exports.adminDto = void 0;
var adminDto = function (res) {
    return {
        _id: res._id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        role: res.role,
        accessToken: "",
    };
};
exports.adminDto = adminDto;
var userDto = function (res) {
    return {
        _id: res._id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        uId: res.uId,
        wallet: res.wallet,
        points: res.points,
        accessToken: "",
    };
};
exports.userDto = userDto;
var adminUserDto = function (res) {
    return {
        _id: res._id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        mobile: res.mobile,
        dob: res.dob,
        uId: res.uId,
        sponserBY: {} || null,
        nominee: {} || null,
        pin: res.pin,
    };
};
exports.adminUserDto = adminUserDto;
var userProfileDto = function (res) {
    return {
        _id: res._id,
        pId: res.pId,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        mobile: res.mobile,
        dob: res.dob,
        uId: res.uId,
        locality: res.locality,
        city: res.city,
        district: res.district,
        state: res.state,
        pin: res.pin,
        sponserBY: {} || null,
        nominee: {} || null,
    };
};
exports.userProfileDto = userProfileDto;
