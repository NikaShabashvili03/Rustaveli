const express = require('express');
const userController = require('../controllers/userController'); // Adjust this path as needed
const authMiddleware = require('../middlewares/authMiddleware'); // Adjust this path as needed

const router = express.Router();

// Apply middleware to protect routes
router.get('/admin/users', authMiddleware, userController.getAllUsers); // GET all users (admin only)
router.put('/admin/users/:userId', authMiddleware, userController.updateUserRole); // Update user role

module.exports = router;
