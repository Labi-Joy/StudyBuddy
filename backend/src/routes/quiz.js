const express = require('express');
const { randomWAEC } = require('../controllers/quizController');

const router = express.Router();
router.get('/waec', randomWAEC);

module.exports = router;
