import express from 'express'
import { slotCollections } from './slot.collection';

const router = express.Router();



router.get(
    '/availability',
    slotCollections.getAllSlots
);



export const slotRouters = router;
