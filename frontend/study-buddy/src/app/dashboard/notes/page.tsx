'use client';

import { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { sampleQuizQuestions } from '@/lib/mockData';
import QuizTaking from '@/components/dashboard/QuizTaking';

export default function NotesPage() {
  const { uploadedFile, generatedQuiz, setUploadedFile, setGeneratedQuiz, clearGeneratedQuiz } = useStore();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleGenerateQuiz = () => {
    if (!uploadedFile) return;
    
    setUploading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedQuiz({
        title: uploadedFile.name.replace(/\.[^/.]+$/, ''),
        questions: sampleQuizQuestions,
      });
      setUploading(false);
    }, 2000);
  };

  if (generatedQuiz) {
    return <QuizTaking quiz={generatedQuiz} onBack={clearGeneratedQuiz} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Your Study Notes</h2>
        <p className="text-gray-600 mb-6">
          Upload your notes (PDF, DOCX, TXT) and we&apos;ll generate a custom quiz for you
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            {uploadedFile ? uploadedFile.name : 'Drag and drop your file here, or click to browse'}
          </p>
          <p className="text-sm text-gray-500 mb-4">Maximum file size: 5MB</p>
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt"
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

        {uploadedFile && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleGenerateQuiz}
              disabled={uploading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Quiz...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <span>Generate Quiz</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}