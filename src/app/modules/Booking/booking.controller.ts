import { Request, Response } from "express";
import { bookingSevices } from "./booking.services";

const addBooking = async (req: Request, res: Response) => {
  const { flatId, userId } = req.body;

  try {
    const booking = await bookingSevices.addBookingIntoDB(flatId, userId);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Booking requests submitted successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleBooking = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const bookingRequests = await bookingSevices.getBookingFromDB(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking requests retrieved successfully",
      data: bookingRequests,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBooking = async (req: Request, res: Response) => {
  try {
    const bookingRequests = await bookingSevices.getAllBookingFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking requests retrieved successfully",
      data: bookingRequests,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  try {
    const updatedBooking = await bookingSevices.updateBookingIntoDB(
      bookingId,
      status
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking request updated successfully",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingController = {
  addBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
};
