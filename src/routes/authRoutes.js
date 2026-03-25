const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verificaToken = require('../middlewares/authMiddleware');

router.post('/register', authController.create);
router.post('/login', authController.login);
router.post('/google', authController.loginWithGoogle)

module.exports = router;