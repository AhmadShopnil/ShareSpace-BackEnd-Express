/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = err.message || " Something wrong!";
  let errorDetails = err;

  // check error type
  if (err instanceof ZodError) {
    statusCode = 400;
    const formatedError = handleZodError(err);
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

export default globalErrorHandler;
