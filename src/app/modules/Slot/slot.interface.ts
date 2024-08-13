import { Types } from "mongoose";

export type TSlot = {
    service: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: 'available' | 'booked' | 'canceled';
}

export type TQuery = { service: string, date: string, isBooked: string }