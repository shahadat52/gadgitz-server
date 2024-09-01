/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
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
    /*
    find the slot 
    update status booked
    create a booking
    */
    await SlotModel.findByIdAndUpdate(isSlotAvailable?._id, { isBooked: 'booked' }, { new: true })

    if (!isServiceAvailable) {
        throw new AppError(httpStatus.FORBIDDEN, 'Service not found')
    };
    if (isSlotAvailable?.isBooked === 'booked') {
        throw new AppError(httpStatus.FORBIDDEN, 'Slot Already Booked')
    };
    if (!isSlotAvailable) {
        throw new AppError(httpStatus.FORBIDDEN, 'Slot not found')
    };
    const result = await BookingModel.create(data);
    return result
};

const getAllBookingsFromDB = async (query: any) => {
    let searchQuery: any = {};


    if (query?.id) {
        searchQuery._id = query.id; // Assuming the ID corresponds to the Booking ID (_id)
    }
    if (query?.customer) {
        searchQuery.customer = query.customer; // Assuming the ID corresponds to the Booking ID (_id)
    }
    // If there's a searchTerm, add conditions to search within specific fields
    if (query?.searchTerm) {
        searchQuery.$or = [
            { 'customer.name': { $regex: query.searchTerm, $options: 'i' } }, // Case-insensitive search for customer name
            { 'service.name': { $regex: query.searchTerm, $options: 'i' } },   // Case-insensitive search for service name
            { 'slot.date': { $regex: query.searchTerm, $options: 'i' } },      // Case-insensitive search for slot date
        ];
    }

    const result = await BookingModel.find(searchQuery)
        .populate('customer')
        .populate('slot')
        .populate('service');
    return result
};

const getBookingByCustomerFromDB = async (user: JwtPayload) => {
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
    getBookingByCustomerFromDB
}