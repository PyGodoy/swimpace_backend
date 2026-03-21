const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const verificaToken = require('../middlewares/authMiddleware');

router.get('/saves', verificaToken, activityController.getSaves);
router.post('/saves', verificaToken, activityController.postSaves);
router.delete('/saves/:id', verificaToken, activityController.deleteSaves);

module.exports = router;