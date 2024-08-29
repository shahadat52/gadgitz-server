import express from 'express'
import { serviceCollections } from './services.collection';
import auth from '../../middlewares/auth';

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



export const serviceRouters = router;
