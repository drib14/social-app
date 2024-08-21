const MarketplaceItem = require('../models/MarketplaceItem');

// Create a new marketplace item
exports.createMarketplaceItem = async (req, res) => {
    try {
        const item = new MarketplaceItem({ sellerId: req.user.id, ...req.body });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all marketplace items
exports.getMarketplaceItems = async (req, res) => {
    try {
        const items = await MarketplaceItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a marketplace item
exports.deleteMarketplaceItem = async (req, res) => {
    try {
        const item = await MarketplaceItem.findByIdAndDelete(req.params.itemId);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
