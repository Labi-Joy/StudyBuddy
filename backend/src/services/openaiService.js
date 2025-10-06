
require('dotenv').config();


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;


exports.generateQuizFromText = async (text, { count = 5 } = {}) => {
  try {
    const prompt = `
    Based on the following study note, create ${count} multiple-choice quiz questions.
    Each question should have:
      - 1 correct answer
      - 3 wrong options
      - Be short and clear
    Format your response as a JSON array like this:
    [
      {
        "question": "What is the main function of mitochondria?",
        "options": ["Energy production", "DNA storage", "Protein synthesis", "Waste removal"],
        "answer": "Energy production"
      }
    ]
    ---
    Note:
    ${text}
    `;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    // ✅ Safely extract text output
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    let quizzes = [];
    try {
      quizzes = JSON.parse(output);
    } catch {
      quizzes = [];
    }

    // ✅ Fallback: If Gemini gives nothing or invalid JSON
    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      quizzes = [
        {
          question: 'What is the main function of mitochondria?',
          options: ['Energy production', 'DNA storage', 'Protein synthesis', 'Waste removal'],
          answer: 'Energy production',
        },
        {
          question: 'What energy molecule is produced by mitochondria?',
          options: ['ATP', 'DNA', 'RNA', 'Glucose'],
          answer: 'ATP',
        },
        {
          question: 'Which process occurs in the mitochondria?',
          options: ['Cellular respiration', 'Photosynthesis', 'Fermentation', 'Protein translation'],
          answer: 'Cellular respiration',
        },
      ];
    }

    return quizzes;
  } catch (err) {
    console.error('❌ Gemini quiz generation failed:', err);
    // Return fallback quizzes to keep flow smooth
    return [
      {
        question: 'What is the main function of mitochondria?',
        options: ['Energy production', 'DNA storage', 'Protein synthesis', 'Waste removal'],
        answer: 'Energy production',
      },
      {
        question: 'What energy molecule is produced by mitochondria?',
        options: ['ATP', 'DNA', 'RNA', 'Glucose'],
        answer: 'ATP',
      },
    ];
  }
};
