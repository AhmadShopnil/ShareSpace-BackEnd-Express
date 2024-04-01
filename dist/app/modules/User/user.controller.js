"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user.services");
const userZodValidationSchema_1 = require("./userZodValidationSchema");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body);
    try {
        const zodValidatedData = userZodValidationSchema_1.UserValidation.userValidationSchema.parse(req.body);
        const result = yield user_services_1.userServices.createUserIntoDB(zodValidatedData);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUserProfileByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    try {
        const userProfile = yield user_services_1.userServices.getUserProfileFromDB(userId);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile retrieved successfully",
            data: userProfile,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const updatedProfileData = req.body;
    try {
        const updatedProfile = yield user_services_1.userServices.updateProfileIntoDB(userId, updatedProfileData);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile updated successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.userController = {
    createUser,
    getSingleUserProfileByID,
    updateUserProfile,
};
