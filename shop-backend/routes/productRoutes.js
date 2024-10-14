const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Define your routes
router.post('/', productController.createProduct); // Create product
router.get('/', productController.getAllProducts); // Get all products
router.get('/:id', productController.getProductById); // Get product by ID
router.put('/:id', productController.updateProduct); // Update product
router.delete('/:id', productController.deleteProduct); // Delete product

module.exports = router;
