import express from 'express';
const router = express.Router();
import ProductRouter from './controllers/products/product.route.js'

router.use("/product", ProductRouter)

export default router;