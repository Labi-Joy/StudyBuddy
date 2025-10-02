'use client';

import { useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckSquare, MessageCircle, Menu, LogOut, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import Logo from '@/components/Logo';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, logout, toggleChatbot } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Redirect if not authenticated - use useEffect
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Show nothing while redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-green-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-green-700">
          {sidebarOpen && (
            <Logo size="sm" showText={true} />
          )}
          {!sidebarOpen && (
            <Logo size="sm" showText={false} />
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-green-700 p-2 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => router.push('/dashboard/notes')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            {sidebarOpen && <span>Notes to Quiz</span>}
          </button>

          <button
            onClick={() => router.push('/dashboard/quizzes')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <CheckSquare className="w-5 h-5" />
            {sidebarOpen && <span>WAEC Quizzes</span>}
          </button>

          <button
            onClick={toggleChatbot}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <MessageCircle className="w-5 h-5" />
            {sidebarOpen && <span>AI Assistant</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-green-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-blue-900 text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Study Buddy Dashboard</h1>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-800 px-4 py-2 rounded-lg flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}