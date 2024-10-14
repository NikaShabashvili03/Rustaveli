const express = require('express');
const adminController = require('../controllers/adminController');
const { create, login } = require('../routes/validations/admin.validation'); // Adjust path if necessary
const { handleValidationError } = require('../utils/handleValidationError');
const { checkAdmin } = require('../utils/checkAdmin'); // Adjust path if necessary

const router = express.Router();

router.post('/create', create, handleValidationError, adminController.createAdmin);
router.post('/login', login, handleValidationError, adminController.login);
router.get('/profile', checkAdmin, adminController.profile);

module.exports = router;
