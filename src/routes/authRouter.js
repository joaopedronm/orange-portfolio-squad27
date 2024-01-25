const express = require('express');
const router = express.Router();
const authController = require('../Controller/authControllers');

router.post('/register', authController.registerUser);

module.exports = router;
