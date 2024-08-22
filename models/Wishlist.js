const mongoose = require('mongoose');

     const WishlistSchema = new mongoose.Schema({
         name: { type: String, required: true },
         user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
         items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
         createdAt: { type: Date, default: Date.now },
     });

     const Wishlist = mongoose.model('Wishlist', WishlistSchema);
     module.exports = Wishlist;
