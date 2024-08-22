const express = require('express');
   const mongoose = require('mongoose');
   const app = express();

   // Middleware to parse JSON
   app.use(express.json());

   // Connect to MongoDB
   mongoose.connect('mongodb://localhost:27017/wishlistApp', { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.log(err));

   // Basic route
   app.get('/', (req, res) => {
       res.send('Welcome to the Wishlist App!');
   });

   // Start the server
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
