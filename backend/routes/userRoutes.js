const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile/:userId', authMiddleware, getProfile);
router.put('/profile/:userId', authMiddleware, updateProfile);
router.delete('/profile/:userId', authMiddleware, deleteProfile); // Add this line

module.exports = router;
