const geminiService = require('../services/geminiService');

exports.randomWAEC = async (req, res, next) => {
  try {
    const { subject, year, count } = req.body;

    if (!subject) {
      return res.status(400).json({ message: 'Please provide a subject.' });
    }

    const numQuestions = parseInt(count, 10) || 5;
    const examYear = parseInt(year, 10) || new Date().getFullYear();

    const prompt = `
Create ${numQuestions} WAEC-style multiple-choice questions for ${subject} exam ${examYear}.
Each question should include:
- 1 correct answer
- 3 wrong options
- The correct answer
- A detailed explanation for the correct answer
Return your response as a JSON array like this:
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct option",
    "explanation": "Detailed explanation"
  }
]
`;

    const generated = await geminiService.chat(prompt);

    let questions = [];
    try {
      const match = generated.match(/\[.*\]/s);
      if (match) {
        questions = JSON.parse(match[0]);
      }
    } catch (err) {
      console.error('Failed to parse generated questions:', err);
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      questions = Array.from({ length: numQuestions }, (_, i) => ({
        question: `Sample WAEC ${subject} question #${i + 1}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        answer: 'Option A',
        explanation: 'This is a placeholder explanation for the correct answer.',
      }));
    }

    res.json({
      subject,
      year: examYear,
      questions,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
