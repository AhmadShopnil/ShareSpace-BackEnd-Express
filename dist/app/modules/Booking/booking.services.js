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
exports.bookingSevices = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const addBookingIntoDB = (flatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma.booking.create({
        data: {
            flat: {
                connect: {
                    id: flatId,
                },
            },
            user: {
                connect: {
                    id: userId,
                },
            },
            status: "PENDING",
        },
    });
    return booking;
});
const getAllBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookingRequests = yield prisma.booking.findMany();
    return bookingRequests;
});
const getBookingFromDB = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingRequests = yield prisma.booking.find({
        where: {
            bookingId,
        },
    });
    return bookingRequests;
});
const updateBookingIntoDB = (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBooking = yield prisma.booking.update({
        where: {
            id: bookingId,
        },
        data: {
            status,
        },
    });
    return updatedBooking;
});
exports.bookingSevices = {
    addBookingIntoDB,
    getBookingFromDB,
    updateBookingIntoDB,
    getAllBookingFromDB,
};
