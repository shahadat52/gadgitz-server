import express from 'express'
import { bookingCollections } from './booking.collection';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
    '/',
    auth('user'),
    bookingCollections.createBooking
);

router.get(
    '/',
    auth('admin'),
    bookingCollections.getAllBookings
);



export const bookingRoutes = router