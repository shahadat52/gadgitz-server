/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { slotServices } from "./slot.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TQuery } from "./slot.interface";

const createSlot: RequestHandler = catchAsync(async (req, res) => {
    const result = await slotServices.createSlotInDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Slot is created successfully',
        data: result,
    })
});

const getAllSlots: RequestHandler = catchAsync(async (req, res) => {
    const result = await slotServices.getAllSlotsFromDB(req.query as TQuery)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Slots Retrieved successfully',
        data: result,
    })
});


const updateStatus: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await slotServices.updateStatusInDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Slots Status Updated successfully',
        data: result,
    })
});

export const slotCollections = {
    createSlot,
    getAllSlots,
    updateStatus
}
