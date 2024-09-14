import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { reviewServices } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createReview: RequestHandler = catchAsync(async (req, res) => {
    const user = req.user
    const result = await reviewServices.createReviewInDB(user, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Thanks for feedback',
        data: result,
    })
});

const getAllReview: RequestHandler = catchAsync(async (req, res) => {
    const result = await reviewServices.getAllReviewsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reviews Data Retrieved',
        data: result,
    })
});

export const reviewCollections = {
    createReview,
    getAllReview
}