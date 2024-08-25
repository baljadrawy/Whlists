const express = require('express');
const Wishlist = require('../models/Wishlist');
const Item = require('../models/Item');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// عرض قائمة الأمنيات للمستخدم
router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('items');
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// إضافة عنصر جديد لقائمة الأمنيات
router.post('/:userId/add', authMiddleware, async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const item = new Item({ title, description, image });
        await item.save();

        let wishlist = await Wishlist.findOne({ userId: req.params.userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.params.userId, items: [item._id] });
        } else {
            wishlist.items.push(item._id);
        }
        await wishlist.save();
        res.status(201).json({ message: 'Item added to wishlist' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
