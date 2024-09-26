const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { isAdmin, protect } = require('../middleware/authMiddleware.js');

// Protected admin routes
router.post('/', protect, isAdmin, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', protect, isAdmin, updateCategory);
router.delete('/:id', protect, isAdmin, deleteCategory);

module.exports = router;
