import express from 'express';
import { login, microsoftLogin, sendOtp, verifyOtp } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// router.post('/login', login);

router.post('/send-otp', sendOtp);

router.post('/verify-otp', verifyOtp);

router.post('/microsoft-login', microsoftLogin);

export default router;
