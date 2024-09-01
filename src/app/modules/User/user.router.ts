import express from 'express'
import { userCollections } from './user.collection';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
    '/',
    auth('admin'),
    userCollections.getAllUsers
);

router.get(
    '/:id',
    auth('user', 'admin'),
    userCollections.getUserById
);

router.put(
    '/:id',
    auth('admin'),
    userCollections.updateUserRole
);

router.put(
    '/profile/:id',
    auth('admin', 'user'),
    userCollections.updateUserData
)


export const userRoutes = router;
