import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// router.get("/", userController.createUser);
router.post("/", auth(), bookingController.addBooking);
router.put("/:bookingId", auth(), bookingController.updateBooking);
router.get("/:bookingId", bookingController.getSingleBooking);
router.get("/", auth(), bookingController.getAllBooking);

export const bookingRoutes = router;
