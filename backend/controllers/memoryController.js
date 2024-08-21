const Memory = require('../models/Memory');

// Create a new memory
exports.createMemory = async (req, res) => {
    try {
        const memory = new Memory({ userId: req.user.id, ...req.body });
        await memory.save();
        res.status(201).json(memory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get memories for a user
exports.getMemories = async (req, res) => {
    try {
        const memories = await Memory.find({ userId: req.params.userId });
        res.status(200).json(memories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
