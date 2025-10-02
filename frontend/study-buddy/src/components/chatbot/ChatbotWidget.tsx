'use client';

import { useState, KeyboardEvent } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { mockChatbotResponses } from '@/lib/mockData';

export default function ChatbotWidget() {
  const { chatbotOpen, messages, setChatbotOpen, addMessage } = useStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' as const };
    addMessage(userMessage);
    
    let botResponse = mockChatbotResponses.default;
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('waec')) botResponse = mockChatbotResponses.waec;
    else if (lowerInput.includes('quiz')) botResponse = mockChatbotResponses.quiz;
    else if (lowerInput.includes('note')) botResponse = mockChatbotResponses.notes;
    else if (lowerInput.includes('help')) botResponse = mockChatbotResponses.help;

    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: botResponse, sender: 'bot' as const };
      addMessage(botMessage);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!chatbotOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col" style={{ height: '500px' }}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">AI Study Assistant</span>
        </div>
        <button
          onClick={() => setChatbotOpen(false)}
          className="hover:bg-blue-700 p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Hi! I&apos;m your AI study assistant.</p>
            <p className="text-sm mt-2">Ask me anything about WAEC or how to use Study Buddy!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}