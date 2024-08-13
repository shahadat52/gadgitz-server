import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { TQuery, TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const createSlotInDB = async (data: TSlot) => {
    const alreadyCreated = await SlotModel.find({
        $and: [
            { service: data.service },
            { date: data.date },
            { startTime: data.startTime },
            { endTime: data.endTime }
        ]
    });

    if (alreadyCreated.length > 0) {
        throw new AppError(httpStatus.ALREADY_REPORTED, 'Already this slot is available')
    }
    const result = await SlotModel.create(data);

    return result
};


const getAllSlotsFromDB = async (query: TQuery) => {
    let findQuery = {}
    if (query.service && query.date) {
        query.isBooked = 'available'
        findQuery = query

    }
    const result = await SlotModel.find(findQuery);

    return result
}

export const slotServices = {
    createSlotInDB,
    getAllSlotsFromDB
}