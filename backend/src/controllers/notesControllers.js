const fileService = require('../services/fileServices');
const parseService = require('../services/parseService');
const openaiService = require('../services/openaiService');
const ttsService = require('../services/ttsService');
const Note = require('../models/Note');

exports.uploadNote = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { originalname, mimetype, buffer } = req.file;

    
    const fileUrl = await fileService.uploadBufferToCloudinary(buffer, originalname, 'notes');

  
    const textContent = await parseService.extractTextFromBuffer(buffer, mimetype, originalname);

  
    const quizzes = await openaiService.generateQuizFromText(textContent, { count: 10 });

    const note = await Note.create({
      user: req.user.id,
      title: originalname,
      fileUrl,
      fileType: mimetype,
      textContent,
      quizzes
    });

    res.json({ note });
  } catch (err) {
    next(err);
  }
};

exports.generateTTS = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const ttsUrl = await ttsService.synthesizeTextAndUpload(note.textContent || note.title);
    note.ttsUrl = ttsUrl;
    await note.save();

    res.json({ ttsUrl });
  } catch (err) {
    next(err);
  }
};
