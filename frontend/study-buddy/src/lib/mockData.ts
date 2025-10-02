export interface Quiz {
  id: number;
  subject: string;
  questions: number;
  duration: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizzesByDepartment: Record<string, Quiz[]> = {
  science: [
    { id: 1, subject: 'Physics', questions: 15, duration: '30 min' },
    { id: 2, subject: 'Chemistry', questions: 20, duration: '40 min' },
    { id: 3, subject: 'Biology', questions: 18, duration: '35 min' },
    { id: 4, subject: 'Mathematics', questions: 25, duration: '45 min' },
    { id: 5, subject: 'English Language', questions: 20, duration: '40 min' },
  ],
  commercial: [
    { id: 6, subject: 'Accounting', questions: 20, duration: '40 min' },
    { id: 7, subject: 'Economics', questions: 18, duration: '35 min' },
    { id: 8, subject: 'Commerce', questions: 15, duration: '30 min' },
    { id: 9, subject: 'Mathematics', questions: 20, duration: '40 min' },
    { id: 10, subject: 'English Language', questions: 20, duration: '40 min' },
  ],
  arts: [
    { id: 11, subject: 'Literature in English', questions: 20, duration: '40 min' },
    { id: 12, subject: 'Government', questions: 18, duration: '35 min' },
    { id: 13, subject: 'History', questions: 15, duration: '30 min' },
    { id: 14, subject: 'CRS/IRS', questions: 15, duration: '30 min' },
    { id: 15, subject: 'English Language', questions: 20, duration: '40 min' },
  ],
};

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the SI unit of force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Which gas is most abundant in Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 2
  },
  {
    id: 3,
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
    correctAnswer: 2
  },
];

export const mockChatbotResponses: Record<string, string> = {
  waec: "WAEC (West African Examinations Council) is an examination board that conducts standardized tests for students in West African countries. I can help you prepare with practice quizzes!",
  quiz: "You can generate quizzes by uploading your notes in the 'Notes to Quiz' section, or practice with our pre-made WAEC quizzes organized by department.",
  notes: "To generate a quiz from your notes, go to the 'Notes to Quiz' tab, upload your study material (PDF, DOCX, or TXT up to 5MB), and click 'Generate Quiz'.",
  help: "I'm here to help you study! You can ask me about WAEC, quizzes, how to use the platform, or any study-related questions.",
  default: "That's a great question! I'm here to assist you with your studies. Try asking me about WAEC, quizzes, or how to use Study Buddy."
};