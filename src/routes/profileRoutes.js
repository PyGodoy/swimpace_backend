const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verificaToken = require('../middlewares/authMiddleware');

router.get('/', verificaToken, profileController.getProfile);
router.put('/edit', verificaToken, profileController.putProfile);

module.exports = router;