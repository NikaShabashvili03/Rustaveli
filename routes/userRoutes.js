const express = require('express');
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/users', authMiddleware.adminAuth, userController.getUsers);
router.delete('/user/:id', authMiddleware.adminAuth, userController.deleteUser);

module.exports = router;
