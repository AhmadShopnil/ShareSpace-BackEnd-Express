"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let errorMessage = err.message || " Something wrong!";
    let errorDetails = err;
    // check error type
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        const formatedError = (0, handleZodError_1.default)(err);
        errorMessage = formatedError.zodMessage;
        errorDetails = {
            issues: formatedError.formatedIssues,
        };
    }
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        errorDetails,
    });
};
exports.default = globalErrorHandler;
