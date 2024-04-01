"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
// router.get("/", userController.createUser);
router.post("/", (0, auth_1.default)(), booking_controller_1.bookingController.addBooking);
router.put("/:bookingId", (0, auth_1.default)(), booking_controller_1.bookingController.updateBooking);
router.get("/:bookingId", booking_controller_1.bookingController.getSingleBooking);
router.get("/", (0, auth_1.default)(), booking_controller_1.bookingController.getAllBooking);
exports.bookingRoutes = router;
