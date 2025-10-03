
const googleService = require("../services/googleService");

exports.chat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const reply = await googleService.chat(message);

    res.json({ reply });
  } catch (err) {
    next(err);
  }
};
