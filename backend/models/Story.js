const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    images: [{ type: String }],
    videos: [{ type: String }],
    privacySettings: {
        storyVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' }
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
