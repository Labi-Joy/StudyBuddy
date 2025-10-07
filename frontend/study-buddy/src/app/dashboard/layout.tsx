'use client';

import { useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { CheckSquare, MessageCircle, Menu, LogOut, User, Home, Mic, Library, BookOpen, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import Logo from '@/components/Logo';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, toggleChatbot } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Closed by default on mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // For desktop collapse
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); // Auto-open on desktop
      } else {
        setSidebarOpen(false); // Auto-close on mobile
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle sidebar collapse on desktop
  const toggleSidebarCollapse = () => {
    if (!isMobile) {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

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

  // Helper function to check if route is active
  const isActive = (path: string) => pathname === path;

  // Navigation items
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/dashboard/my-notes', icon: Library, label: 'My Notes' },
    { path: '/dashboard/notes', icon: BookOpen, label: 'Upload Notes' },
    { path: '/dashboard/quizzes', icon: CheckSquare, label: 'WAEC Quizzes' },
    { path: '/dashboard/voice', icon: Mic, label: 'Text-to-Speech' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${
          isMobile ? 'fixed' : 'sticky'
        } top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-600 to-green-700 text-white transition-transform duration-300 flex flex-col shadow-2xl z-50`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-green-500">
          <Logo size="sm" showText={true} />
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-green-500 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-white text-green-600 shadow-lg font-semibold'
                    : 'hover:bg-green-500 text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* AI Assistant Button */}
          <button
            onClick={() => {
              toggleChatbot();
              if (isMobile) setSidebarOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-500 transition-all text-white"
          >
            <MessageCircle className="w-5 h-5" />
            <span>AI Assistant</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-green-500 space-y-2">
          <div className="bg-green-500 bg-opacity-50 rounded-lg p-3 mb-2">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-green-100 truncate">{user.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white shadow-md">
          <div className="flex items-center justify-between p-4 md:px-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  {navItems.find(item => item.path === pathname)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-500 hidden md:block">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 rounded-lg items-center space-x-2 text-white shadow-md">
                <User className="w-5 h-5" />
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}