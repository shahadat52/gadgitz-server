/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import SSLCommerzPayment from 'sslcommerz-lts';
import { SlotModel } from '../Slot/slot.model';
import catchAsync from '../../utils/catchAsync';
import config from '../../config';
import { BookingModel } from '../Booking/booking.model';
import AppError from '../../errors/appErrors';
import httpStatus from 'http-status';
import { ServiceModel } from '../Service/service.model';

const is_live = false;

const paymentIntendInDB: RequestHandler = catchAsync(async (req, res) => {
    const payload = req.body;
    const isServiceAvailable = await ServiceModel.findById(payload?.service)
    const isSlotAvailable = await SlotModel.findById(payload?.slot);
    if (!isServiceAvailable) {
        throw new AppError(httpStatus.FORBIDDEN, 'Service not found')
    };
    if (isSlotAvailable?.isBooked === 'booked') {
        throw new AppError(httpStatus.FORBIDDEN, 'Slot Already Booked')
    };
    if (!isSlotAvailable) {
        throw new AppError(httpStatus.FORBIDDEN, 'Slot available')
    };

    const booked = await BookingModel.create(payload)

    const data = {
        total_amount: isServiceAvailable?.price,
        currency: 'BDT',
        tran_id: new ObjectId().toString(),
        success_url: `${config.server_local}/api/payment/success/?slot=${payload?.slot}`,
        fail_url: `${config.server_local}/api/payment/fail/?booked=${booked?._id}`,
        cancel_url: `${config.server_local}/api/payment/cancel`,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(config.payment.store_id, config.payment.store_pass, is_live)
    sslcz.init(data).then((apiResponse: { GatewayPageURL: any }) => {
        let GatewayPageURL: any = apiResponse.GatewayPageURL
        const url = GatewayPageURL
        res.send({ url });
    })

})

const paymentSuccess: RequestHandler = catchAsync(async (req, res) => {
    const { slot } = req.query
    await SlotModel.findByIdAndUpdate(slot, { isBooked: 'booked' }, { new: true })
    res.redirect(`${config.front_end_local}/payment/success`)
})

const paymentFailed: RequestHandler = catchAsync(async (req, res) => {
    const { booked } = req.query;
    await BookingModel.deleteOne({ _id: booked })
    res.redirect(`${config.front_end_local}/payment/fail`)
})


export const paymentServices = {
    paymentIntendInDB,
    paymentSuccess,
    paymentFailed
}

