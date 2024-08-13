import express from 'express'
import { authCollections } from './auth.collection';

const router = express.Router();

router.post('/signup', authCollections.createUser);
router.post('/login', authCollections.login)

export const authRouters = router;
