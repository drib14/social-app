const express = require('express');
const { createMemory, getMemories } = require('../controllers/memoryController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/memories', authMiddleware, createMemory);
router.get('/memories/:userId', authMiddleware, getMemories);

module.exports = router;
