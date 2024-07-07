import express from 'express';
import { getAllUsers } from '../controllers/users.js';

const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Public (or Private if needed authentication)
router.get('/', getAllUsers);

export default router;
