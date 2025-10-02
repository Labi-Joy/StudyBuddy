import { ArrowLeft, CheckSquare, Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { quizzesByDepartment } from '@/lib/mockData';

export default function QuizList() {
  const { selectedDepartment, setSelectedDepartment, setSelectedQuiz } = useStore();
  
  if (!selectedDepartment) return null;
  
  const quizzes = quizzesByDepartment[selectedDepartment];

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setSelectedDepartment(null)}
        className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Departments</span>
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
        {selectedDepartment} Department Quizzes
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedQuiz(quiz)}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">{quiz.subject}</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <CheckSquare className="w-4 h-4" />
                <span>{quiz.questions} questions</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{quiz.duration}</span>
              </span>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}