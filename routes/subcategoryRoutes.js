const express = require('express');
const subcategoryController = require('../controllers/subcategoryController');

const router = express.Router();

router.post('/', subcategoryController.createSubcategory);
router.get('/:categoryId', subcategoryController.getSubcategoriesByCategoryId);
router.put('/:id', subcategoryController.updateSubcategory);  // Update subcategory
router.delete('/:id', subcategoryController.deleteSubcategory);  // Delete subcategory

module.exports = router;
