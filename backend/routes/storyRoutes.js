const express = require('express');
const { createStory, getStories, deleteStory } = require('../controllers/storyController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/stories', authMiddleware, createStory);
router.get('/stories/:userId', authMiddleware, getStories);
router.delete('/stories/:storyId', authMiddleware, deleteStory); // Add this line

module.exports = router;
