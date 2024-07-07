import express from 'express';
import { updatePrivacy, getPrivacy } from '../controllers/privacy.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

// Route to update privacy setting
router.post('/privacy', authenticateToken, updatePrivacy);

// Route to get current privacy setting for a specific user
router.get('/privacy/:userId', authenticateToken, getPrivacy);

export default router;
