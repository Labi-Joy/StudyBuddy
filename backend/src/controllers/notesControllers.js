const fileService = require('../services/fileServices');
const parseService = require('../services/parseService');
const openaiService = require('../services/openaiService');
const geminiService = require('../services/geminiService');
const Note = require('../models/Note');

exports.uploadTextNote = async (req, res, next) => {
  try {
    const text = req.body?.text;

    if (!text) {
      return res.status(400).json({ message: 'Please provide note text.' });
    }

    const summaryPrompt = `
      Summarize and explain the following study note clearly and simply for better understanding:
      ${text}
    `;
    const summary = await geminiService.chat(summaryPrompt);

    let quizzes = await openaiService.generateQuizFromText(text, { count: 10 });
    quizzes = Array.isArray(quizzes) ? quizzes : []; 

    const note = await Note.create({
      user: req.user.id,
      title: 'Text Note',
      textContent: text,
      summary,
      quizzes,
    });

    res.json({
      message: 'Text note uploaded successfully',
      note,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.uploadFileNote = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file.' });
    }

    const { originalname, mimetype, buffer } = req.file;

    const fileUrl = await fileService.uploadBufferToCloudinary(buffer, originalname, 'notes');

    const extractedText = await parseService.extractTextFromBuffer(buffer, mimetype, originalname);

    const summaryPrompt = `
      Summarize and explain the following study note clearly and simply for better understanding:
      ${extractedText}
    `;
    const summary = await geminiService.chat(summaryPrompt);

    let quizzes = await openaiService.generateQuizFromText(extractedText, { count: 10 });
    quizzes = Array.isArray(quizzes) ? quizzes : []; 

    const note = await Note.create({
      user: req.user.id,
      title: originalname,
      fileUrl,
      fileType: mimetype,
      textContent: extractedText,
      summary,
      quizzes,
    });

    res.json({
      message: 'File note uploaded successfully',
      note,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
