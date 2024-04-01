"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_services_1 = require("./booking.services");
const addBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { flatId } = req.body;
    const { userId } = req === null || req === void 0 ? void 0 : req.user;
    try {
        const booking = yield booking_services_1.bookingSevices.addBookingIntoDB(flatId, userId);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Booking requests submitted successfully",
            data: booking,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const getSingleBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const bookingRequests = yield booking_services_1.bookingSevices.getBookingFromDB(userId);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Booking requests retrieved successfully",
            data: bookingRequests,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const getAllBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingRequests = yield booking_services_1.bookingSevices.getAllBookingFromDB();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Booking requests retrieved successfully",
            data: bookingRequests,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const { status } = req.body;
    try {
        const updatedBooking = yield booking_services_1.bookingSevices.updateBookingIntoDB(bookingId, status);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Booking request updated successfully",
            data: updatedBooking,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.bookingController = {
    addBooking,
    getAllBooking,
    getSingleBooking,
    updateBooking,
};
