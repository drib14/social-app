const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const event = new Event({ createdBy: req.user.id, ...req.body });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get events for a group
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ groupId: req.params.groupId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.eventId);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
