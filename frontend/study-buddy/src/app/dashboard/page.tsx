'use client';

import { BookOpen, FileText, MessageCircle, Mic } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function DashboardHome() {
  const router = useRouter();
  const { user } = useStore();

  const stats = [
    {
      label: 'Notes Uploaded',
      value: '0',
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      label: 'Quizzes Taken',
      value: '0',
      icon: BookOpen,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      label: 'AI Chats',
      value: '0',
      icon: MessageCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      label: 'Voice Notes',
      value: '0',
      icon: Mic,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
  ];

  const quickActions = [
    {
      title: 'Upload Notes',
      description: 'Convert your study notes to interactive quizzes',
      icon: FileText,
      color: 'bg-blue-500',
      onClick: () => router.push('/dashboard/notes')
    },
    {
      title: 'WAEC Practice',
      description: 'Practice with AI-generated WAEC questions',
      icon: BookOpen,
      color: 'bg-green-500',
      onClick: () => router.push('/dashboard/quizzes')
    },
    {
      title: 'Text-to-Speech',
      description: 'Convert your notes to audio',
      icon: Mic,
      color: 'bg-orange-500',
      onClick: () => router.push('/dashboard/voice')
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'Student'}! 👋
        </h1>
        <p className="text-blue-100">
          Ready to enhance your learning journey? Let&apos;s get started!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                onClick={action.onClick}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-left group"
              >
                <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity (Placeholder) */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <div className="text-gray-400 mb-4">
            <FileText className="w-16 h-16 mx-auto mb-4" />
          </div>
          <p className="text-gray-600 mb-4">No recent activity yet</p>
          <p className="text-sm text-gray-500">
            Upload your first note or take a quiz to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
