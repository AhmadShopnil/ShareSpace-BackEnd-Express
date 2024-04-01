import { Application, Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  //   console.log(req.body);
  try {
    const result = await userServices.createUserIntoDB(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Faild to create user",
      error: error,
    });
  }
};

const getSingleUserProfileByID = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const userProfile = await userServices.getUserProfileFromDB(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile retrieved successfully",
      data: userProfile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedProfileData = req.body;

  try {
    const updatedProfile = await userServices.updateProfileIntoDB(
      userId,
      updatedProfileData
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  createUser,
  getSingleUserProfileByID,
  updateUserProfile,
};
