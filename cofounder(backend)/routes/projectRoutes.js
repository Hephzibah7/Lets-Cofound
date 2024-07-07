import express from 'express';
import { createProject, getAllProjects, getProjectById, getProjectChatMessages, addChatMessage, getInterestedProjects, getUserProjects, getApprovedProjects, getInterestRequests } from '../controllers/projects.js';
import { authenticateToken } from '../utils/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post(
  '/projectform',
  authenticateToken,
  upload.fields([
    { name: 'postImage', maxCount: 1 },
    { name: 'pitchDeck', maxCount: 1 },
  ]),
  createProject
);

router.get('/projects', authenticateToken, getAllProjects);
router.get('/projectsingle/:projectId', authenticateToken, getProjectById);
router.post('/chat/:projectId', authenticateToken, addChatMessage);
router.get('/chat/:projectId', authenticateToken, getProjectChatMessages);
router.get('/interestedprojects/:userId', authenticateToken, getInterestedProjects);

// Route to get all projects of the current user
router.get('/user-projects', authenticateToken, getUserProjects);

// you can fetch all projects in which the user has shown interest but the requests have not been approved yet
router.get('/interest-requests', authenticateToken, getInterestRequests); 

// Route to get all projects where the current user has been approved
router.get('/approved-projects', authenticateToken, getApprovedProjects);


export default router;
