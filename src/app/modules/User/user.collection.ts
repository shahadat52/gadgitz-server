import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { RequestHandler } from "express";
import { userServices } from "./user.service";

const createUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await userServices.createUserInDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created successfully',
        data: result,
    })
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
    const result = await userServices.getAllUsersFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users data retrieved successfully',
        data: result,
    })
});

const getUserById: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await userServices.getAllUsersByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User data retrieved successfully',
        data: result,
    })
});

const updateUserRole: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await userServices.updateUserRoleInDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users updated successfully',
        data: result,
    })
});

const updateUserData: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await userServices.updateProfileInDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users updated successfully',
        data: result,
    })
});

export const userCollections = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserData,
    updateUserRole
}