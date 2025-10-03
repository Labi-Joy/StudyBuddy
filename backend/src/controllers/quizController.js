const waecService = require('../services/waecService');

exports.randomWAEC = async (req, res, next) => {
  try {
    const subject = req.query.subject || 'general';
    const count = parseInt(req.query.count, 10) || 10;
    const questions = await waecService.getRandomQuestions(subject, count);
    res.json({ questions });
  } catch (err) {
    next(err);
  }
};
