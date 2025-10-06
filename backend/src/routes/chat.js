const express = require('express');
const { chat } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/chat', protect, chat);

module.exports = router;
