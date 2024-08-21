const express = require('express');
const { createPost, getPosts, editPost, deletePost } = require('../controllers/postController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/posts', authMiddleware, createPost);
router.get('/posts/:userId', authMiddleware, getPosts);
router.put('/posts/:postId', authMiddleware, editPost); // Add this line for editing posts
router.delete('/posts/:postId', authMiddleware, deletePost); // Add this line for deleting posts

module.exports = router;
