import express from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import {
  getAllProfiles,
  getAllPosts,
  searchProfiles,
  searchPosts,
  searchProjects
} from '../controllers/searchController.js';

const router = express.Router();

router.get('/getallprofiles', authenticateToken, getAllProfiles);
router.get('/getallposts', authenticateToken, getAllPosts);
router.get('/profiles', authenticateToken, searchProfiles);
router.get('/posts', authenticateToken, searchPosts);
router.get('/projects', authenticateToken, searchProjects);

export default router;
