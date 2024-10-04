require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//  auth Routes
app.use('/api/auth', authRoutes);
// Category Routes
app.use('/api/categories', categoryRoutes);

// User Routes
app.use('/api', userRoutes); // This keeps your existing setup, so no change is needed here.

// Subcategory Routes
app.use('/api/subcategories', subcategoryRoutes);

// Product Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
