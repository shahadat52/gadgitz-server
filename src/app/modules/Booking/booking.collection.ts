import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { bookingServices } from "./booking.service";

const createBooking: RequestHandler = catchAsync(async (req, res) => {
    const result = await bookingServices.createBookingInDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings is created successfully',
        data: result,
    })
});

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
    const result = await bookingServices.getAllBookingsFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Booking Retrieved Successfully',
        data: result,
    })
});


const getBookingById: RequestHandler = catchAsync(async (req, res) => {
    const result = await bookingServices.getBookingByIdFromDB(req.user)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking Retrieved Successfully',
        data: result,
    })
});

export const bookingCollections = {
    createBooking,
    getAllBookings,
    getBookingById
}