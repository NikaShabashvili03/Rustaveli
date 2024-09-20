import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use category routes
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
