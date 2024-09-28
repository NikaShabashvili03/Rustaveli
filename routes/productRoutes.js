const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/:subcategoryId', productController.getProductsBySubcategoryId);
router.put('/:id', productController.updateProduct);  // Update product
router.delete('/:id', productController.deleteProduct);  // Delete product

module.exports = router;
