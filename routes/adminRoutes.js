const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Shop routes
router.put('/shop/:id', authMiddleware.adminAuth, adminController.editShop);

// Category routes
router.put('/category/:id', authMiddleware.adminAuth, adminController.editCategory);

// User routes
router.put('/user/:id', authMiddleware.adminAuth, adminController.editUser);

module.exports = router;
