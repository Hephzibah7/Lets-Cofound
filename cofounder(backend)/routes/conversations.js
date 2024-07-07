import express from 'express';
import { newConversation, getConversations } from '../controllers/conversations.js';

const router = express.Router();

router.post('/', newConversation);
router.get('/:userId', getConversations);

export default router;
