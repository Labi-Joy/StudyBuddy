const express = require('express');
const multer = require('multer');
const { uploadNote, generateTTS } = require('../controllers/notesControllers');
const { protect } = require('../middlewares/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadNote);
router.post('/:noteId/tts', protect, generateTTS);

module.exports = router;
