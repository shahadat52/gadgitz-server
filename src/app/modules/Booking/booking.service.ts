import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { ServiceModel } from "../Service/service.model";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { SlotModel } from "../Slot/slot.model";
import { JwtPayload } from "jsonwebtoken";

const createBookingInDB = async (data: TBooking) => {
    const isServiceAvailable = await ServiceModel.findById(data.service)
    const isSlotAvailable = await SlotModel.findById(data.slot)

    if (!isServiceAvailable) {
        throw new AppError(httpStatus.FORBIDDEN, 'Service not found')
    };
    if (!isSlotAvailable) {
        throw new AppError(httpStatus.FORBIDDEN, 'Slot not found')
    };
    const result = await BookingModel.create(data);
    return result
};

const getAllBookingsFromDB = async () => {
    const result = await BookingModel.find()
        .populate('customer')
        .populate('slot')
        .populate('service');
    return result
};

const getBookingByIdFromDB = async (user: JwtPayload) => {
    const result = await BookingModel.find({
        customer: user.id,
    })
        .populate('customer')
        .populate('slot')
        .populate('service');

    return result;
}



export const bookingServices = {
    createBookingInDB,
    getAllBookingsFromDB,
    getBookingByIdFromDB
}