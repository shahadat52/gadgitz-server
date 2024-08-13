import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { serviceServices } from "./service.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createService: RequestHandler = catchAsync(async (req, res) => {
    const result = await serviceServices.createServiceInDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service is created successfully',
        data: result,
    })
});

const getAllServices: RequestHandler = catchAsync(async (req, res) => {
    const result = await serviceServices.getAllServicesFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All services is retrieved successfully',
        data: result,
    })
});

const updateService: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await serviceServices.updateServiceInDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service data updated successfully',
        data: result,
    })
});

const deleteService: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await serviceServices.deleteServiceFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete service successfully',
        data: result,
    })
});

export const serviceCollections = {
    createService,
    getAllServices,
    updateService,
    deleteService
}
