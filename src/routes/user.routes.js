const express = require('express');

//controllers
const userController = require('../controllers/user.controller');

//middlewares
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.post('/signup', validationMiddleware.createUserValidation, userController.signup);

router.post('/login', validationMiddleware.loginUserValidation, userController.login);

module.exports = router;
