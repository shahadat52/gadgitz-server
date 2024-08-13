import express from 'express'
import { authCollections } from './auth.collection';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './auth.validation';

const router = express.Router();

router.post(
    '/signup',
    validateRequest(userValidations.userValidationSchema),
    authCollections.createUser);
router.post('/login', authCollections.login)

export const authRouters = router;
