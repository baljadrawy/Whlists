const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            title: { type: String, required: true },
            image: { type: String },
            description: { type: String },
            isFulfilled: { type: Boolean, default: false },
        },
    ],
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
module.exports = Wishlist;
