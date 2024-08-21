const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    images: [{ type: String }],
    videos: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model('Memory', memorySchema);
module.exports = Memory;
