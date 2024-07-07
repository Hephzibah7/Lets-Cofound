import express from 'express';
import { register, login, googleLogin, googleVerify } from '../controllers/authController.js';

const router = express.Router();

// router.post('/google', googleAuth);
router.post('/register', register);
router.post('/login', login);
router.post('/googleLogin', googleLogin);
router.post('/googleVerify', googleLogin);

export default router;
