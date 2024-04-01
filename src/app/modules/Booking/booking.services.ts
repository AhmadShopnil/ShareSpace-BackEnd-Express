import { BookingStatus } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addBookingIntoDB = async (flatId: String, userId: String) => {
  const booking = await prisma.booking.create({
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
};

const getAllBookingFromDB = async () => {
  const bookingRequests = await prisma.booking.findMany();
  return bookingRequests;
};
const getBookingFromDB = async (bookingId: String) => {
  const bookingRequests = await prisma.booking.find({
    where: {
      bookingId,
    },
  });
  return bookingRequests;
};

const updateBookingIntoDB = async (
  bookingId: String,
  status: BookingStatus
) => {
  const updatedBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status,
    },
  });
  return updatedBooking;
};

export const bookingSevices = {
  addBookingIntoDB,
  getBookingFromDB,
  updateBookingIntoDB,
  getAllBookingFromDB,
};
