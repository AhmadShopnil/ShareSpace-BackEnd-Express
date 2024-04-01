"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required." }),
    email: zod_1.z.string({ required_error: "Email is required." }).email(),
    password: zod_1.z
        .string({ required_error: "password is required." })
        .min(6, { message: "Password must be more than 6 characters." }),
    bio: zod_1.z.string(),
    profession: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.UserValidation = {
    userValidationSchema: exports.userValidationSchema,
};
