require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const productRoutes = require('./routes/productRoutes');

const errorHandler = require('./middlewares/errorHandler');

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Category Routes
app.use('/api/categories', categoryRoutes);

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
