import express from "express";
import { flatController } from "./flat.controller";

const router = express.Router();

// router.get("/", userController.createUser);
router.post("/", flatController.addFlat);
router.get("/", flatController.getFlat);

export const flatRoutes = router;
