import express from 'express';
import { uploadStory, getStories, deleteStory } from '../controllers/stories.js';
import { authenticateToken } from '../utils/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Upload a new story
router.post('/upload-story', authenticateToken, upload.single('story'), uploadStory);

// Fetch all stories
router.get('/stories', authenticateToken, getStories);

// Delete a story by ID
router.delete('/stories/:id', authenticateToken, deleteStory);

export default router;
