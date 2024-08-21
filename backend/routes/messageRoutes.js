const express = require('express');
const { sendMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/messages', authMiddleware, sendMessage);
router.get('/messages/:userId', authMiddleware, getMessages);
router.delete('/messages/:messageId', authMiddleware, deleteMessage); // Add this line

module.exports = router;
