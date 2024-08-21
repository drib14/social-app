const Story = require('../models/Story');

// Create a new story
exports.createStory = async (req, res) => {
    try {
        const story = new Story({
            userId: req.user.id,
            ...req.body,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await story.save();
        res.status(201).json(story);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all stories for a user
exports.getStories = async (req, res) => {
    try {
        const stories = await Story.find({
            userId: req.params.userId,
            expiresAt: { $gte: Date.now() }
        });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a story
exports.deleteStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndDelete(req.params.storyId);
        if (!story) return res.status(404).json({ error: 'Story not found' });
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
