const express = require('express');
const router = express.Router();

const { registerNewUser } = require('../controllers/authController');

router.route('/register').post(registerNewUser);

module.exports = router;    