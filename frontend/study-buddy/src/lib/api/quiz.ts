import apiClient from './client';

export interface WAECQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface WAECQuizResponse {
  subject: string;
  year: number;
  questions: WAECQuestion[];
}

export const quizApi = {
  generateWAECQuiz: async (subject: string, year?: number, count?: number) => {
    const response = await apiClient.post<WAECQuizResponse>('/quiz/waec', {
      subject,
      year,
      count,
    });
    return response.data;
  },
};
