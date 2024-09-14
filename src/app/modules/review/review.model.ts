import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema: Schema<TReview> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
});

// Create the Review model
export const ReviewModel = mongoose.model<TReview>('Review', reviewSchema);