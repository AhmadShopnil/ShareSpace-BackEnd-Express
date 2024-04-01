import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

// router.get("/", userController.createUser);
router.post("/", bookingController.addBooking);
router.put("/:bookingId", bookingController.updateBooking);
router.get("/:bookingId", bookingController.getSingleBooking);
router.get("/", bookingController.getAllBooking);

export const bookingRoutes = router;
