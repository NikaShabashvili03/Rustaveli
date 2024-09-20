import express from 'express';
import * as ProductController from '../controllers/product.controller.js';

const router = express.Router();

// Define the routes
router.post('/create', ProductController.create);
router.get('/get', ProductController.get);

export default router;
