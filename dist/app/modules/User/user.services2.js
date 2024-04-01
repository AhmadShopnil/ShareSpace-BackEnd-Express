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
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(payload.password, 12);
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
    // create user using transaction and rollback
    const result = yield prisma.$transaction((userProfileTransaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield userProfileTransaction.user.create({
            data: userInfo,
        });
        // then create user profile using transaction and rollback
        const createdProfile = yield userProfileTransaction.userProfile.create({
            data: profileInfo,
        });
        return createdProfile;
    }));
    return result;
});
exports.userServices = {
    createUserIntoDB,
};
