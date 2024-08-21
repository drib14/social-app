const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    reactions: [{ userId: Schema.Types.ObjectId, type: String }],
    comments: [{ userId: Schema.Types.ObjectId, comment: String, createdAt: Date }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
