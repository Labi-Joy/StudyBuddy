const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  fileUrl: String,
  fileType: String,
  textContent: String,
  summary: String,
  quizzes: Array,
});

module.exports = mongoose.model('Note', noteSchema);
