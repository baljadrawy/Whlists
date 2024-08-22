const mongoose = require('mongoose');

     const ItemSchema = new mongoose.Schema({
         name: { type: String, required: true },
         description: { type: String },
         imageUrl: { type: String },
         isProvided: { type: Boolean, default: false },
         wishlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist', required: true },
         providedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
         createdAt: { type: Date, default: Date.now },
     });

     const Item = mongoose.model('Item', ItemSchema);
     module.exports = Item;
     
