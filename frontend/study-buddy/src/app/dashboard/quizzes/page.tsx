'use client';

import { useStore } from '@/store/useStore';
import DepartmentSelector from '@/components/dashboard/DepartmentSelector';
import QuizList from '@/components/dashboard/QuizList';
import QuizTaking from '@/components/dashboard/QuizTaking';
import { sampleQuizQuestions } from '@/lib/mockData';

export default function QuizzesPage() {
  const { selectedDepartment, selectedQuiz, clearQuiz } = useStore();

  if (selectedQuiz) {
    return (
      <QuizTaking
        quiz={{
          title: selectedQuiz.subject,
          questions: sampleQuizQuestions,
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