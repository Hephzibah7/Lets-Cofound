import express from 'express';
import { showInterest, approveInterest, getNotifications, sendInvitation, approveInvitation } from '../controllers/notifications.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.post('/showinterest/:id', authenticateToken, showInterest);
router.post('/projects/:notificationId/approveInterest', authenticateToken, approveInterest);
router.get('/notifications/:userId', authenticateToken, getNotifications);
router.post('/invitationsent/:id/:inuserId', authenticateToken, sendInvitation);
router.post('/projects/:notificationId/approveInvitation', authenticateToken, approveInvitation);

export default router;
