import { Application, Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  //   console.log(req.body);

  const result = await userServices.createUserIntoDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
};

export const userController = { createUser };
