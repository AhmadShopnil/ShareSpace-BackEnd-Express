import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.services";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.loginUser(req.body);

    // send response in client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  loginUser,
};
