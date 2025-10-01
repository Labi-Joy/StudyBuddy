import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface Quiz {
  id: number;
  subject: string;
  questions: number;
  duration: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface GeneratedQuiz {
  title: string;
  questions: QuizQuestion[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface StoreState {
  // Auth state
  isAuthenticated: boolean;
  user: User | null;
  
  // UI state
  chatbotOpen: boolean;
  
  // Quiz state
  selectedDepartment: string | null;
  selectedQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedAnswers: Record<number, number>;
  
  // Notes state
  uploadedFile: File | null;
  generatedQuiz: GeneratedQuiz | null;
  
  // Chatbot state
  messages: Message[];
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  toggleChatbot: () => void;
  setChatbotOpen: (open: boolean) => void;
  addMessage: (message: Message) => void;
  setSelectedDepartment: (department: string | null) => void;
  setSelectedQuiz: (quiz: Quiz | null) => void;
  setUploadedFile: (file: File | null) => void;
  setGeneratedQuiz: (quiz: GeneratedQuiz | null) => void;
  clearQuiz: () => void;
  clearGeneratedQuiz: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  chatbotOpen: false,
  selectedDepartment: null,
  selectedQuiz: null,
  currentQuestionIndex: 0,
  selectedAnswers: {},
  uploadedFile: null,
  generatedQuiz: null,
  messages: [],
  
  // Actions
  login: (user) => set({ isAuthenticated: true, user }),
  
  logout: () => set({ 
    isAuthenticated: false, 
    user: null,
    selectedDepartment: null,
    selectedQuiz: null,
    messages: [],
    uploadedFile: null,
    generatedQuiz: null,
  }),
  
  toggleChatbot: () => set((state) => ({ chatbotOpen: !state.chatbotOpen })),
  
  setChatbotOpen: (open) => set({ chatbotOpen: open }),
  
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
  
  setSelectedQuiz: (quiz) => set({ selectedQuiz: quiz }),
  
  setUploadedFile: (file) => set({ uploadedFile: file }),
  
  setGeneratedQuiz: (quiz) => set({ generatedQuiz: quiz }),
  
  clearQuiz: () => set({ 
    selectedQuiz: null, 
    currentQuestionIndex: 0,
    selectedAnswers: {},
  }),
  
  clearGeneratedQuiz: () => set({ 
    generatedQuiz: null, 
    uploadedFile: null 
  }),
}));