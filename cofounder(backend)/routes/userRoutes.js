import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/users', authenticateToken, getAllUsers);

export default router;
