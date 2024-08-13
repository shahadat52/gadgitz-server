import { Router } from "express";
import { authRouters } from "../modules/auth/auth.router";
import { serviceRouters } from "../modules/Service/service.router";
import { slotRouters } from "../modules/Slot/slot.router";
import { bookingRoutes } from "../modules/Booking/booking.router";


// import express from 'express'
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    router: authRouters,
  },
  {
    path: '/services',
    router: serviceRouters,
  },
  {
    path: '/slots',
    router: slotRouters,
  },
  {
    path: '/bookings',
    router: bookingRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
