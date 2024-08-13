import express from 'express'
import { serviceCollections } from './services.collection';
import auth from '../../middlewares/auth';
import { slotCollections } from '../Slot/slot.collection';

const router = express.Router();

router.post(
    '/',
    auth('admin'),
    serviceCollections.createService
);

router.get(
    '/',
    serviceCollections.getAllServices
);

router.get(
    '/:id',
    serviceCollections.getServiceById
);

router.put(
    '/:id',
    auth('admin'),
    serviceCollections.updateService
);

router.delete(
    '/:id',
    auth('admin'),
    serviceCollections.deleteService
);

router.post(
    '/slots',
    auth('admin'),
    slotCollections.createSlot
);


export const serviceRouters = router;
