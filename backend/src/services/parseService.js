const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

exports.extractTextFromBuffer = async (buffer, mimetype = '', filename = '') => {
  try {
    if (mimetype === 'application/pdf' || filename.toLowerCase().endsWith('.pdf')) {
      const data = await pdfParse(buffer);
      return data.text;
    }

    if (
      mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      filename.toLowerCase().endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }

    // fallback to plain text
    return buffer.toString('utf8');
  } catch (err) {
    console.warn('parseService error:', err);
    return '';
  }
};
