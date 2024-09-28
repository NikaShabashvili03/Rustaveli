const express = require('express');
const productController = require('../controllers/productController'); // Make sure this path is correct

const router = express.Router();

// Route to create a product
router.post('/', productController.createProduct); // Ensure createProduct is correctly referenced

// Route to get products by subcategory ID
router.get('/:subcategoryId', productController.getProductsBySubcategoryId); // Ensure getProductsBySubcategoryId is correctly referenced

module.exports = router;
