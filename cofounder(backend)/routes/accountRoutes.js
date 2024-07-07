import express from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import {
  updateEmail,
  updatePassword,
  updateUsername,
} from '../controllers/accountController.js';

const router = express.Router();

// Update email
router.post('/updateEmail', authenticateToken, updateEmail);

// Update password
router.post('/updatePassword', authenticateToken, updatePassword);

// Update username
router.post('/updateUsername', authenticateToken, updateUsername);

export default router;
