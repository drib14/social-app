const express = require('express');
const { getProfile, updateProfile, deleteProfile, searchUser, followUser, unfollowUser, suggestionsUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Existing routes
router.get('/profile/:userId', authMiddleware, getProfile);
router.put('/profile/:userId', authMiddleware, updateProfile);
router.delete('/profile/:userId', authMiddleware, deleteProfile); // Deleting a profile

// New routes
router.get('/search', authMiddleware, searchUser);
router.patch('/user/:id/follow', authMiddleware, followUser);
router.patch('/user/:id/unfollow', authMiddleware, unfollowUser);
router.get('/suggestionsUser', authMiddleware, suggestionsUser);

module.exports = router;
