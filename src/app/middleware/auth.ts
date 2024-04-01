import { NextFunction, Request, Response } from "express";

import { Secret } from "jsonwebtoken";

import httpStatus from "http-status";
import FormatedError from "../errors/FormatedError";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new FormatedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_secret as Secret
      );

      req.user = verifiedUser;

      if (!verifiedUser) {
        throw new FormatedError(
          httpStatus.FORBIDDEN,
          "You do not have the necessary permissions to perform this!"
        );
      }

      //   if (roles.length && !roles.includes(verifiedUser.role)) {
      //     throw new FormatedError(httpStatus.FORBIDDEN, "Forbidden!");
      //   }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
