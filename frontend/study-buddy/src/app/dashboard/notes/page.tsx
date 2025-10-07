'use client';

import { useState, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, FileText } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { notesApi } from '@/lib/api';
import QuizTaking from '@/components/dashboard/QuizTaking';

export default function NotesPage() {
  const { uploadedFile, generatedQuiz, setUploadedFile, setGeneratedQuiz, clearGeneratedQuiz } = useStore();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [noteText, setNoteText] = useState('');
  const [generateQuiz, setGenerateQuiz] = useState(true);
  const [summary, setSummary] = useState('');

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const allowed = ['image/png','image/jpeg','image/jpg','text/plain'];
      if (!allowed.includes(file.type)) {
        alert('Only images (PNG, JPG) and plain text (.txt) are allowed');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleGenerateFromFile = async () => {
    if (!uploadedFile) return;

    setUploading(true);
    setError('');

    try {
      const response = await notesApi.uploadFile(uploadedFile);

      // Transform backend quiz format to frontend format
      const transformedQuestions = response.note.quizzes.map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: q.options,
        correctAnswer: q.options.indexOf(q.answer),
        explanation: q.explanation,
      }));

      setSummary(response.note.summary || '');
      if (generateQuiz) {
        setGeneratedQuiz({
          title: response.note.title,
          questions: transformedQuestions,
        });
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(error.response?.data?.message || error.message || 'Failed to generate quiz');
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateFromText = async () => {
    if (!noteText.trim()) return;

    setUploading(true);
    setError('');
    setSummary('');
    setGeneratedQuiz(null);

    try {
      const response = await notesApi.uploadText(noteText);
      const transformedQuestions = response.note.quizzes.map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: q.options,
        correctAnswer: q.options.indexOf(q.answer),
        explanation: q.explanation,
      }));
      setSummary(response.note.summary || '');
      if (generateQuiz) {
        setGeneratedQuiz({
          title: response.note.title,
          questions: transformedQuestions,
        });
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(error.response?.data?.message || error.message || 'Failed to process note');
    } finally {
      setUploading(false);
    }
  };

  if (generatedQuiz) {
    return <QuizTaking quiz={generatedQuiz} onBack={clearGeneratedQuiz} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload or Paste Your Study Notes</h2>
        <p className="text-gray-600 mb-6">We&apos;ll summarize your note and, if you choose, generate a quiz from it.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            {uploadedFile ? uploadedFile.name : 'Drag and drop your file here, or click to browse'}
          </p>
          <p className="text-sm text-gray-500 mb-4 flex items-center justify-center space-x-3">
            <span className="inline-flex items-center space-x-1"><ImageIcon className="w-4 h-4" /><span>PNG, JPG</span></span>
            <span>•</span>
            <span className="inline-flex items-center space-x-1"><FileText className="w-4 h-4" /><span>TXT</span></span>
            <span>•</span>
            <span>Max 5MB</span>
          </p>
          <input
            type="file"
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,.txt"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer font-medium"
          >
            Choose File
          </label>
        </div>

        {/* Text input section */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste Text</label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Paste your note content here..."
          />
        </div>

        {/* Options */}
        <div className="mt-4 flex items-center space-x-3">
          <input id="gen-quiz" type="checkbox" checked={generateQuiz} onChange={(e) => setGenerateQuiz(e.target.checked)} />
          <label htmlFor="gen-quiz" className="text-gray-700">Also generate a quiz from my note</label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-end">
          {uploadedFile && (
            <button
              onClick={handleGenerateFromFile}
              disabled={uploading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
            >
              {uploading ? 'Processing File...' : `Explain ${generateQuiz ? 'and Generate Quiz' : ''}`}
            </button>
          )}

          <button
            onClick={handleGenerateFromText}
            disabled={uploading || !noteText.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {uploading ? 'Processing Text...' : `Explain ${generateQuiz ? 'and Generate Quiz' : ''}`}
          </button>
        </div>

        {summary && !generatedQuiz && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 whitespace-pre-wrap">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            {summary}
          </div>
        )}
      </div>
    </div>
  );
}