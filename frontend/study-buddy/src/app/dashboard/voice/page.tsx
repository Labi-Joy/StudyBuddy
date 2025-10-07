'use client';

import { useState } from 'react';
import { Mic, Image as ImageIcon, FileAudio, Loader } from 'lucide-react';
import { voiceApi } from '@/lib/api';

export default function VoicePage() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [mode, setMode] = useState<'text' | 'image'>('text');

  const handleTextToVoice = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setAudioUrl('');

    try {
      // Use browser Speech Synthesis API for immediate TTS fallback
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
      // Create a placeholder note to indicate playback (no downloadable URL via Web Speech API)
      setAudioUrl('');
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'Failed to speak text');
    } finally {
      setLoading(false);
    }
  };

  const handleImageToVoice = async () => {
    if (!image) return;

    setLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const response = await voiceApi.imageToVoice(image);
      setAudioUrl(response.ttsUrl);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(error.response?.data?.message || error.message || 'Failed to generate audio from image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-orange-100 p-3 rounded-lg">
            <Mic className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Text-to-Speech</h2>
            <p className="text-gray-600">Convert your notes or images to audio</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setMode('text')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              mode === 'text'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mic className="w-5 h-5 inline mr-2" />
            Text to Voice
          </button>
          <button
            onClick={() => setMode('image')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              mode === 'image'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ImageIcon className="w-5 h-5 inline mr-2" />
            Image to Voice
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {mode === 'text' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                placeholder="Type or paste your text here to convert it to audio..."
              />
            </div>

            <button
              onClick={handleTextToVoice}
              disabled={loading || !text.trim()}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Generating Audio...</span>
                </>
              ) : (
                <>
                  <FileAudio className="w-5 h-5" />
                  <span>Generate Audio</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-500 transition">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                {image ? image.name : 'Upload an image with text'}
              </p>
              <p className="text-sm text-gray-500 mb-4">We&apos;ll extract text and convert to audio</p>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg cursor-pointer font-medium"
              >
                Choose Image
              </label>
            </div>

            {image && (
              <button
                onClick={handleImageToVoice}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Generating Audio...</span>
                  </>
                ) : (
                  <>
                    <FileAudio className="w-5 h-5" />
                    <span>Generate Audio</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-500 p-2 rounded-full">
                <FileAudio className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Audio Generated Successfully!</h3>
                <p className="text-sm text-gray-600">Listen to your audio below</p>
              </div>
            </div>

            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>

            <a
              href={audioUrl}
              download
              className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
