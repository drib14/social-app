const express = require('express');
const { createGroup, getGroups, deleteGroup } = require('../controllers/groupController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/groups', authMiddleware, createGroup);
router.get('/groups', authMiddleware, getGroups);
router.delete('/groups/:groupId', authMiddleware, deleteGroup); // Add this line

module.exports = router;
