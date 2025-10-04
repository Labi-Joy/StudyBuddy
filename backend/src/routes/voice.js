const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); 
const { textToVoice } = require("../controllers/voiceController");

router.post("/text-to-voice", upload.single("image"), textToVoice);

module.exports = router;
