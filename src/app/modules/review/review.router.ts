import express from 'express';
import { reviewCollections } from './review.collection';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/',
    auth('user'),
    reviewCollections.createReview
);

router.get(
    '/',
    reviewCollections.getAllReview
)

export const reviewRouters = router