const Tesseract = require("tesseract.js");

exports.extractTextFromBuffer = async (buffer, mimetype, originalname) => {
  try {
    const { data: { text } } = await Tesseract.recognize(buffer, "eng");
    return text.trim();
  } catch (error) {
    console.error("OCR extraction failed:", error);
    throw new Error("Failed to extract text from image");
  }
};
