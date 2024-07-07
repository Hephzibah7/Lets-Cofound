// import express from 'express';
// import { newMessage, getMessages } from '../controllers/messages.js';

// const router = express.Router();

// router.post('/', newMessage);
// router.get('/:conversationId', getMessages);

// export default router;


import express from 'express';
import { getMessagesBetweenUsers } from '../controllers/messages.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

// Get messages between two users
router.get('/messages/:user1/:user2', authenticateToken, getMessagesBetweenUsers);

export default router;
