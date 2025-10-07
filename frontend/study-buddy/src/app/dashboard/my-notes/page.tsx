'use client';

import { useState, useEffect } from 'react';
import { FileText, Calendar, BookOpen, Loader } from 'lucide-react';
import { notesApi, Note } from '@/lib/api/notes';

export default function MyNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesApi.getUserNotes();
      setNotes(response.notes || []);
    } catch (err) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (selectedNote) {
    return (
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setSelectedNote(null)}
          className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to My Notes</span>
        </button>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{selectedNote.title}</h1>

          {/* Summary Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 AI Summary</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">{selectedNote.summary}</p>
            </div>
          </div>

          {/* Quizzes Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📚 Generated Quizzes ({selectedNote.quizzes.length})
            </h2>
            <div className="space-y-4">
              {selectedNote.quizzes.map((quiz, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <p className="font-semibold text-gray-800 mb-3">
                    {index + 1}. {quiz.question}
                  </p>
                  <div className="space-y-2 mb-4">
                    {quiz.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg ${
                          option === quiz.answer
                            ? 'bg-green-100 border-2 border-green-500'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <span className={option === quiz.answer ? 'font-semibold text-green-700' : 'text-gray-700'}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                  {quiz.explanation && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Explanation:</span> {quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Notes</h1>
        <p className="text-gray-600">View and manage all your uploaded study notes</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {notes.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-md">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No notes yet</h3>
          <p className="text-gray-600 mb-6">Upload your first note to get started!</p>
          <button
            onClick={() => window.location.href = '/dashboard/notes'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Upload Note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              onClick={() => setSelectedNote(note)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {note.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{note.summary}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{note.quizzes.length} quizzes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
