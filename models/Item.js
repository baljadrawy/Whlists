const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    isFulfilled: { type: Boolean, default: false },
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
