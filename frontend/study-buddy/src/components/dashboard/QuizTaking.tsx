'use client';

import { useMemo, useState } from 'react';
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
  const [showReview, setShowReview] = useState(false);

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

  const reviewData = useMemo(() => {
    return quiz.questions.map((q) => {
      const userIdx = selectedAnswers[q.id];
      const correctIdx = q.correctAnswer;
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        userIndex: userIdx,
        correctIndex: correctIdx,
        isCorrect: userIdx === correctIdx,
      };
    });
  }, [quiz.questions, selectedAnswers]);

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= 50;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-4 text-center text-sm text-gray-600">{quiz.title}</div>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{passed ? '🎉' : '📘'}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{passed ? 'Great job!' : 'Keep practicing!'}</h2>
            <div className={`text-5xl font-bold ${passed ? 'text-green-600' : 'text-red-600'} mb-2`}>{percentage}%</div>
            <p className="text-xl text-gray-600">
              You got {score} of {quiz.questions.length} correct
            </p>
          </div>

          {!showReview && (
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setShowReview(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Review Answers
              </button>
              <button
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Back to Quizzes
              </button>
            </div>
          )}

          {showReview && (
            <div className="mt-8 space-y-6">
              <div className="text-center text-sm text-gray-600">{quiz.title}</div>
              {reviewData.map((r, idx) => (
                <div key={r.id} className="border bg-blue-400 rounded-lg p-4">
                  <div className="font-semibold mb-2">Q{idx + 1}. {r.question}</div>
                  <div className="space-y-2">
                    {r.options.map((opt, i) => {
                      const isUser = r.userIndex === i;
                      const isCorrect = r.correctIndex === i;
                      return (
                        <div key={i} className={`p-3 rounded border ${isCorrect ? 'border-green-500 bg-green-50' : isUser ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                          <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                          {isCorrect && <span className="ml-2 text-green-700">(Correct)</span>}
                          {isUser && !isCorrect && <span className="ml-2 text-red-700">(Your answer)</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  onClick={onBack}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Back to Quizzes
                </button>
              </div>
            </div>
          )}
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
        <div className="text-right">
          <div className="text-gray-800 font-semibold">{quiz.title}</div>
          <div className="text-gray-600 font-medium">Question {currentQuestion + 1} of {quiz.questions.length}</div>
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