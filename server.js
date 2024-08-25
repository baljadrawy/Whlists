const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');
const adminRoutes = require('./routes/admin');

const app = express();

// إعداد body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// الاتصال بقاعدة البيانات MongoDB
mongoose.connect('mongodb://localhost:27017/wishlist-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// توجيه الطلبات
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);

// إعداد المجلد العام
app.use(express.static('public'));

// بدء الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
