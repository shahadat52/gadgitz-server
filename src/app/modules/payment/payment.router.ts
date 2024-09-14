import express from 'express';
import { paymentServices } from './payment.service';

const router = express.Router();

router.post(
    '/init',
    paymentServices.paymentIntendInDB
);

router.post(
    '/success',
    paymentServices.paymentSuccess
);

router.post(
    '/fail',
    paymentServices.paymentFailed
);

export const paymentRouters = router