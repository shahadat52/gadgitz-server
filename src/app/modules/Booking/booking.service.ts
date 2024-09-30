/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import mongoose from "mongoose";
import { TOrder } from "./booking.interface";
import { OrderModel } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";

const { ObjectId } = mongoose.Types
const createBookingInDB = async (data: TOrder) => {
    const result = await OrderModel.create(data);
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
            { 'customer.name': { $regex: query.searchTerm, $options: 'i' } }
        ];
    }


    const result = await OrderModel.find(searchQuery)
        .populate([
            { path: 'customer' },
            {
                path: 'products',
                populate: {
                    path: 'product'
                }
            }
        ])

    return result
};

const getBookingByCustomerFromDB = async (user: JwtPayload) => {
    const result = await OrderModel.aggregate([
        { $match: { customer: new ObjectId(`${user.id}`) } },
        {
            $lookup: {
                from: "products",
                localField: "products.product",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        { $unwind: "$productInfo" },
        { $project: { productInfo: 1, _id: 0 } }
    ])
    return result;
}



export const bookingServices = {
    createBookingInDB,
    getAllBookingsFromDB,
    getBookingByCustomerFromDB
}