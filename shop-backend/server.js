require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Import CORS
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Import your admin routes
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS

// Product Routes
app.use('/api/products', productRoutes);

// User Routes
app.use('/api/user', userRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes); // Add admin routes here

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
