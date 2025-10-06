import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
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
  login: (user: User, token: string) => void;
  logout: () => void;
  initAuth: () => void;
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
  login: (user, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ isAuthenticated: true, user });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    set({
      isAuthenticated: false,
      user: null,
      selectedDepartment: null,
      selectedQuiz: null,
      messages: [],
      uploadedFile: null,
      generatedQuiz: null,
    });
  },

  initAuth: () => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ isAuthenticated: true, user });
      } catch {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  },
  
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