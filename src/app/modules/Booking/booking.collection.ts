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
        message: 'Order created successfully',
        data: result,
    })
});

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {

    const result = await bookingServices.getAllBookingsFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Orders Retrieved Successfully',
        data: result,
    })
});


const getBookingByCustomer: RequestHandler = catchAsync(async (req, res) => {
    const result = await bookingServices.getBookingByCustomerFromDB(req.user)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order Retrieved Successfully',
        data: result,
    })
});

export const bookingCollections = {
    createBooking,
    getAllBookings,
    getBookingByCustomer
}