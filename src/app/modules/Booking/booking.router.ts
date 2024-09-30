import express from 'express'
import { bookingCollections } from './booking.collection';
// import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
    '/',
    // auth('user', 'admin'),
    bookingCollections.createBooking
);

router.get(
    '/',
    // auth('admin', 'user'),
    bookingCollections.getAllBookings
);



export const OrderRoutes = router