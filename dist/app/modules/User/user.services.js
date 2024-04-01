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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const userInfo = {
        name: payload.name,
        password: hashedPassword,
        email: payload.email,
    };
    const profileInfo = {
        bio: payload.bio,
        profession: payload.profession,
        address: payload.address,
    };
    const result = yield prisma.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        // Create user
        const createdUser = yield transaction.user.create({
            data: userInfo,
        });
        // Create user profile associated with the created user
        yield transaction.userProfile.create({
            data: Object.assign(Object.assign({}, profileInfo), { user: { connect: { id: createdUser.id } } }),
        });
        return createdUser;
    }));
    const { password } = result, userWithoutPassword = __rest(result, ["password"]);
    return userWithoutPassword;
});
const getUserProfileFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const userProfile = yield prisma.userProfile.findUnique({
        where: {
            userId: userId,
        },
    });
    return userProfile;
});
const updateProfileIntoDB = (userId, updatedProfileData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProfile = yield prisma.userProfile.update({
        where: {
            userId: userId,
        },
        data: updatedProfileData,
    });
    return updatedProfile;
});
exports.userServices = {
    createUserIntoDB,
    getUserProfileFromDB,
    updateProfileIntoDB,
};
