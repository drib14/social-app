const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marketplaceItemSchema = new Schema({
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const MarketplaceItem = mongoose.model('MarketplaceItem', marketplaceItemSchema);
module.exports = MarketplaceItem;
