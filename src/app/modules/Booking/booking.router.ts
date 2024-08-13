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

router.get(
    '/my-bookings',
    auth('user'),
    bookingCollections.getBookingById
);

export const bookingRoutes = router