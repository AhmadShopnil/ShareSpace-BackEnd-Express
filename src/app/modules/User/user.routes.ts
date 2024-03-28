import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// router.get("/", userController.createUser);
router.post("/register", userController.createUser);

export const userRoutes = router;
