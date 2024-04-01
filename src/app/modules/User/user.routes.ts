import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// router.get("/", userController.createUser);
router.get("/:userId", userController.getSingleUserProfileByID);
router.put("/:userId", userController.updateUserProfile);
router.post("/register", userController.createUser);

export const userRoutes = router;
