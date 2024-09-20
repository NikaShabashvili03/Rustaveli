import express from 'express';
import productRoutes from './routes/product.route.js'; // Ensure correct path

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON

// Use the product routes under /api/product
app.use('/api/product', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
