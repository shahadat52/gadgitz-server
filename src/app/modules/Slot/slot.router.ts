import express from 'express'
import { slotCollections } from './slot.collection';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/',
    auth('admin'),

    slotCollections.createSlot
);


router.get(
    '/availability',
    slotCollections.getAllSlots
);

router.put(
    '/:id',
    auth('admin'),
    slotCollections.updateStatus
);



export const slotRouters = router;
