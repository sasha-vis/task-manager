import express from 'express';
import { checkAuthentication } from '../middlewares/checkAuthentication.js';
import { getMe, register, login, logout } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.get('/me', checkAuthentication, getMe);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
