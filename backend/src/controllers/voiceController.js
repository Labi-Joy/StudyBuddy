const parseService = require("../services/parseService");
const ttsService = require("../services/ttsService");

exports.textToVoice = async (req, res, next) => {
  try {
    let { text } = req.body;

    // If an image is uploaded, extract text
    if (req.file) {
      const { buffer, mimetype, originalname } = req.file;
      text = await parseService.extractTextFromBuffer(buffer, mimetype, originalname);
    }

    if (!text) {
      return res.status(400).json({ message: "Please provide text or an image containing text." });
    }

    const ttsUrl = await ttsService.synthesizeTextAndUpload(text);

    res.json({
      message: "Voice generated successfully",
      ttsUrl,
    });
  } catch (err) {
    next(err);
  }
};
