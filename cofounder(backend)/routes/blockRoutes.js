import express from 'express';
import { blockUser, unblockUser, checkBlockStatus, getBlockedUsers, getBlockedUserDetails } from '../controllers/blockController.js';
import { authenticateToken } from '../utils/authMiddleware.js'

const router = express.Router();

// Route to block a user
router.post('/block/:username', authenticateToken, blockUser);

// Route to unblock a user
router.post('/unblock/:username', authenticateToken, unblockUser);

// Route to check block status
router.get('/blockStatus/:username', authenticateToken, checkBlockStatus);

// Route to get blocked users
router.get('/blockusers/:userId', authenticateToken, getBlockedUsers);

// Route to get blocked user details
router.get('/blockeduserdetails/:userId', authenticateToken, getBlockedUserDetails);

export default router;
