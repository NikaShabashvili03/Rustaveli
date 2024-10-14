const express = require('express');
const userController = require('../controllers/userController');
const { create, login } = require('../routes/validations/user.validation');
const {handleValidationError} = require('../utils/handleValidationError');
const { checkUser } = require('../utils/checkUser');

const router = express.Router();

router.post('/create', create, handleValidationError, userController.createUser);
router.post('/login', login, handleValidationError, userController.login);
router.get('/profile', checkUser, userController.profile)
module.exports = router;
