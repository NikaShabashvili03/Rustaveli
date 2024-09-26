const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/category', authMiddleware.adminAuth, categoryController.createCategory);

module.exports = router;
