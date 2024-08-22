const express = require('express');
const Wishlist = require('../models/Wishlist');
const router = express.Router();

// API لإنشاء قائمة الأمنيات
router.post('/', async (req, res) => {
    const { userId, items } = req.body;

    try {
        const wishlist = new Wishlist({ userId, items });
        await wishlist.save();
        res.status(201).json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API لاسترداد قائمة الأمنيات
router.get('/:userId', async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('items');
        if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
