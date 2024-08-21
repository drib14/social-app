const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const message = new Message({ senderId: req.user.id, ...req.body });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { senderId: req.params.userId, receiverId: req.user.id },
                { senderId: req.user.id, receiverId: req.params.userId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.messageId);
        if (!message) return res.status(404).json({ error: 'Message not found' });
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
