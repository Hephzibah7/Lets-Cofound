import express from 'express';
import { getRecommendedProjects, getRecommendedPosts, getRecommendedUsers } from '../controllers/recommendationController.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

// Endpoint to get recommended projects
router.get('/recommend/project', authenticateToken, getRecommendedProjects);
router.get('/recommend/post', authenticateToken, getRecommendedPosts);
router.get('/recommend/users', authenticateToken, getRecommendedUsers);

export default router;
