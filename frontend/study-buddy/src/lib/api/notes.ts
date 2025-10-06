import apiClient from './client';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Note {
  _id: string;
  user: string;
  title: string;
  fileUrl?: string;
  fileType?: string;
  textContent: string;
  summary: string;
  quizzes: QuizQuestion[];
}

export interface UploadNoteResponse {
  message: string;
  note: Note;
}

export const notesApi = {
  uploadText: async (text: string) => {
    const response = await apiClient.post<UploadNoteResponse>('/notes/upload-text', { text });
    return response.data;
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<UploadNoteResponse>('/notes/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
