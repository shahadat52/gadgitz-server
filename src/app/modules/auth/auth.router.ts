import express from 'express'
import { authCollections } from './auth.collection';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../User/user.validation';
import { userCollections } from '../User/user.collection';
// import validateRequest from '../../middlewares/validateRequest';
// import { userValidations } from './auth.validation';

const router = express.Router();

router.post(
    '/login',
    authCollections.login
);

router.post(
    '/signup',
    validateRequest(userValidations.createUserValidationSchema),
    userCollections.createUser
);

export const authRouters = router;
