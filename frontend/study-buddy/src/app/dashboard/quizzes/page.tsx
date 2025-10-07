'use client';

import { useStore } from '@/store/useStore';
import DepartmentSelector from '@/components/dashboard/DepartmentSelector';
import QuizList from '@/components/dashboard/QuizList';
import QuizTaking from '@/components/dashboard/QuizTaking';
import { useEffect, useState } from 'react';
import { quizApi, WAECQuestion } from '@/lib/api/quiz';

export default function QuizzesPage() {
  const { selectedDepartment, selectedQuiz, clearQuiz } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState<WAECQuestion[] | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!selectedQuiz) return;
      setLoading(true);
      setError('');
      setQuestions(null);
      try {
        const res = await quizApi.generateWAECQuiz(selectedQuiz.subject, undefined, selectedQuiz.questions);
        setQuestions(res.questions);
      } catch (err: unknown) {
        const e = err as { message?: string; response?: { data?: { message?: string } } };
        setError(e.response?.data?.message || e.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [selectedQuiz]);

  if (selectedQuiz) {
    if (loading) {
      return <div className="max-w-2xl mx-auto bg-blue-500 rounded-xl shadow p-8 text-center">Generating quiz for {selectedQuiz.subject}...</div>;
    }
    if (error) {
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
          <div className="text-red-600 mb-4">{error}</div>
          <button onClick={clearQuiz} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Back</button>
        </div>
      );
    }
    if (!questions) return null;
    return (
      <QuizTaking
        quiz={{
          title: selectedQuiz.subject,
          questions: questions.map((q, idx) => ({
            id: idx + 1,
            question: q.question,
            options: q.options,
            correctAnswer: q.options.indexOf(q.answer),
          })),
        }}
        onBack={clearQuiz}
      />
    );
  }

  if (selectedDepartment) {
    return <QuizList />;
  }

  return <DepartmentSelector />;
}