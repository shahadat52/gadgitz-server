/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface"
import { ReviewModel } from "./review.model"

const createReviewInDB = async (user: JwtPayload, data: TReview) => {
    const reviewData = {
        ...data,
        user: user?.id
    };
    const result = await ReviewModel.create(reviewData);
    return result
};

const getAllReviewsFromDB = async (query: any) => {
    const limit = query?.limit
    const result = await ReviewModel.find()
        .populate('user')
        .limit(limit)
    return result
};

export const reviewServices = {
    createReviewInDB,
    getAllReviewsFromDB
}