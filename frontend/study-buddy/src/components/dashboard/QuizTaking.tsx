'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { QuizQuestion } from '@/lib/mockData';

interface QuizTakingProps {
  quiz: {
    title: string;
    questions: QuizQuestion[];
  };
  onBack: () => void;
}

export default function QuizTaking({ quiz, onBack }: QuizTakingProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-5xl font-bold text-blue-600 mb-6">{percentage}%</div>
          <p className="text-xl text-gray-600 mb-8">
            You got {score} out of {quiz.questions.length} questions correct
          </p>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </button>
        <div className="text-gray-600 font-medium">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h3>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition text-gray-900 ${
                selectedAnswers[question.id] === index
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedAnswers[question.id] === undefined}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}