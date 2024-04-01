import express from "express";
import { flatController } from "./flat.controller";

const router = express.Router();

// router.get("/", userController.createUser);
router.post("/", flatController.addFlat);
router.get("/", flatController.getFlat);
router.put("/:flatId", flatController.updateFlat);

export const flatRoutes = router;
