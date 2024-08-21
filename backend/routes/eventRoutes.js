const express = require('express');
const { createEvent, getEvents, deleteEvent } = require('../controllers/eventController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/events', authMiddleware, createEvent);
router.get('/events/:groupId', authMiddleware, getEvents);
router.delete('/events/:eventId', authMiddleware, deleteEvent); // Add this line

module.exports = router;
