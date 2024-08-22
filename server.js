const User = require('./models/User');
     const jwt = require('jsonwebtoken');
     const bcrypt = require('bcryptjs');

     // Register new user
     app.post('/api/register', async (req, res) => {
         const { username, email, password } = req.body;
         try {
             const user = new User({ username, email, password });
             await user.save();

             const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
             res.status(201).json({ token });
         } catch (err) {
             res.status(500).json({ error: err.message });
         }
     });
// Login user
     app.post('/api/login', async (req, res) => {
         const { email, password } = req.body;
         try {
             const user = await User.findOne({ email });
             if (!user) return res.status(400).json({ error: 'User not found' });

             const isMatch = await bcrypt.compare(password, user.password);
             if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

             const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
             res.json({ token });
         } catch (err) {
             res.status(500).json({ error: err.message });
         }
     });
const path = require('path');

     // Serve static files
     app.use(express.static(path.join(__dirname, 'public')));

const Wishlist = require('./models/Wishlist');
     const Item = require('./models/Item');

     // Create a new wishlist
     app.post('/api/wishlists', async (req, res) => {
         const { name } = req.body;
         const userId = req.user.id; // Assuming user is authenticated and ID is stored in req.user

         try {
             const wishlist = new Wishlist({ name, user: userId });
             await wishlist.save();
             res.status(201).json(wishlist);
         } catch (err) {
             res.status(500).json({ error: err.message });
         }
     });
// Add an item to a wishlist
     app.post('/api/wishlists/:id/items', async (req, res) => {
         const { name, description, imageUrl } = req.body;
         const wishlistId = req.params.id;

         try {
             const item = new Item({ name, description, imageUrl, wishlist: wishlistId });
             await item.save();

             // Add item to the wishlist
             const wishlist = await Wishlist.findById(wishlistId);
             wishlist.items.push(item);
             await wishlist.save();

             res.status(201).json(item);
         } catch (err) {
             res.status(500).json({ error: err.message });
         }
     });
//إنشاء نقطة نهاية لعرض القوائم والعناصر
// Get all wishlists for a user
     app.get('/api/wishlists', async (req, res) => {
         const userId = req.user.id; // Assuming user is authenticated and ID is stored in req.user

         try {
             const wishlists = await Wishlist.find({ user: userId }).populate('items');
             res.json(wishlists);
         } catch (err) {
             res.status(500).json({ error: err.message });
         }
     });

     // Get a single wishlist with items
     app.get('/api/wishlists/:id', async (req, res) => {
         const wishlistId = req.params.id;

         try {
             const wishlist = await Wishlist.findById(wishlistId).populate('items');
             if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });

             res.json(wishlist);
         } catch (err) {
             res.status(500).json({ error: err.message });
         }
     });
//تحديث عنصر عندما يتم توفيره
// Mark an item as provided
     app.put('/api/items/:id/provide', async (req, res) => {
         const itemId = req.params.id;
         const userId = req.user.id; // Assuming user is authenticated and ID is stored in req.user

         try {
             const item = await Item.findById(itemId);
             if (!item) return res.status(404).json({ error: 'Item not found' });

             item.isProvided = true;
             item.providedBy = userId;
             await item.save();

             res.json(item);
         } catch (err) {
             res.status(500).json({ error: err.message });
         }
     });
