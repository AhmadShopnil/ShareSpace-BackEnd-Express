import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// router.get("/", userController.createUser);
router.get("/profile", auth(), userController.getSingleUserProfileByID);
router.put("/profile", auth(), userController.updateUserProfile);
router.post("/register", userController.createUser);

export const userRoutes = router;
