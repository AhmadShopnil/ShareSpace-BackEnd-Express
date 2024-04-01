import express from "express";
import { flatController } from "./flat.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// router.get("/", userController.createUser);
router.post("/", auth(), flatController.addFlat);
router.get("/", flatController.getFlat);
router.put("/:flatId", auth(), flatController.updateFlat);

export const flatRoutes = router;
