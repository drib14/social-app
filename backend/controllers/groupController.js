const Group = require('../models/Group');

// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const group = new Group({ createdBy: req.user.id, ...req.body });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user.id });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.groupId);
        if (!group) return res.status(404).json({ error: 'Group not found' });
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
