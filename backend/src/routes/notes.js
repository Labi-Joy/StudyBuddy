const express = require('express');
const multer = require('multer');
const { protect } = require('../middlewares/authMiddleware');
const { uploadTextNote, uploadFileNote } = require('../controllers/notesControllers');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, 
});

router.post('/upload-text', protect, uploadTextNote);

router.post('/upload-file', protect, upload.single('file'), uploadFileNote);

module.exports = router;
