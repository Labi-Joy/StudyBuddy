const express = require('express');
const { randomWAEC } = require('../controllers/quizController');

const router = express.Router();

router.post('/waec', randomWAEC);

module.exports = router;
