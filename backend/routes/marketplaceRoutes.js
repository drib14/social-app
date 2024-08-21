const express = require('express');
const { createMarketplaceItem, getMarketplaceItems, deleteMarketplaceItem } = require('../controllers/marketplaceController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/marketplace', authMiddleware, createMarketplaceItem);
router.get('/marketplace', authMiddleware, getMarketplaceItems);
router.delete('/marketplace/:itemId', authMiddleware, deleteMarketplaceItem); // Add this line

module.exports = router;
