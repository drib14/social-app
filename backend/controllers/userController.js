const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for users
exports.searchUser = async (req, res) => {
    const query = req.query.q;
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Follow a user
exports.followUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userToFollow = await User.findById(req.params.id);

        if (!userToFollow) return res.status(404).json({ error: 'User to follow not found' });

        if (user.following.includes(userToFollow._id)) return res.status(400).json({ error: 'Already following this user' });

        user.following.push(userToFollow._id);
        userToFollow.followers.push(user._id);

        await user.save();
        await userToFollow.save();

        res.status(200).json({ message: 'Successfully followed the user' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userToUnfollow = await User.findById(req.params.id);

        if (!userToUnfollow) return res.status(404).json({ error: 'User to unfollow not found' });

        if (!user.following.includes(userToUnfollow._id)) return res.status(400).json({ error: 'Not following this user' });

        user.following = user.following.filter(id => id.toString() !== userToUnfollow._id.toString());
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== user._id.toString());

        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'Successfully unfollowed the user' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user suggestions
exports.suggestionsUser = async (req, res) => {
    try {
        // Example logic for suggestions - you might want to adjust this based on your needs
        const users = await User.find({ _id: { $ne: req.user._id } }).limit(10);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
