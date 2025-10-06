import Link from 'next/link';
import { CheckSquare, MessageCircle, Mic, Brain, Zap, Shield, Users, Star } from 'lucide-react';
import Logo from '@/components/Logo';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" showText={true} />
            <div className="space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              🚀 AI-Powered Learning Platform
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ace Your WAEC Exams with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> AI-Powered Study</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your study notes into interactive quizzes, practice WAEC questions,
            convert notes to audio, and get instant help from your AI study assistant
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all hover:-translate-y-1"
            >
              Start Learning Free
            </Link>
            <Link
              href="#features"
              className="inline-block bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all hover:-translate-y-1"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">10K+</div>
            <div className="text-gray-600 mt-2">Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">50K+</div>
            <div className="text-gray-600 mt-2">Quizzes Generated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">95%</div>
            <div className="text-gray-600 mt-2">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful AI tools designed for Nigerian students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl hover:shadow-xl transition group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Notes to Quiz</h3>
              <p className="text-gray-600">
                Upload your notes and AI generates personalized quizzes instantly
              </p>
            </div>

            <div className="p-6 rounded-xl hover:shadow-xl transition group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">WAEC Practice</h3>
              <p className="text-gray-600">
                Practice with AI-generated WAEC questions for all subjects
              </p>
            </div>

            <div className="p-6 rounded-xl hover:shadow-xl transition group">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mic className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Text-to-Speech</h3>
              <p className="text-gray-600">
                Convert your notes or images to audio for easy learning
              </p>
            </div>

            <div className="p-6 rounded-xl hover:shadow-xl transition group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI Study Assistant</h3>
              <p className="text-gray-600">
                Get instant answers and explanations from your AI tutor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Study Buddy Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Upload Notes</h3>
              <p className="text-gray-600">
                Upload your study materials in PDF, DOCX, or text format
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Processes</h3>
              <p className="text-gray-600">
                Our AI analyzes your notes and generates quizzes and summaries
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Learn & Practice</h3>
              <p className="text-gray-600">
                Take quizzes, get feedback, and ace your exams!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Study Buddy?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Advanced AI analyzes your notes and creates personalized study materials
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <Zap className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Instant Results</h3>
              <p className="text-gray-600">
                Generate quizzes and summaries in seconds, not hours
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <Shield className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">100% Free</h3>
              <p className="text-gray-600">
                All features completely free for Nigerian students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">
                "Study Buddy helped me improve my grades by 40%! The AI-generated quizzes are spot on."
              </p>
              <div className="font-semibold text-gray-800">- Chinedu O., SS3 Student</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">
                "The text-to-speech feature is a game changer! I can now study while commuting."
              </p>
              <div className="font-semibold text-gray-800">- Amina K., WAEC Candidate</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">
                "Best study tool ever! The AI chatbot explains concepts better than my teacher."
              </p>
              <div className="font-semibold text-gray-800">- David E., Science Student</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students acing their WAEC exams with Study Buddy
          </p>
          <Link
            href="/register"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-lg text-xl font-semibold shadow-2xl transition-all hover:-translate-y-1"
          >
            Get Started For Free →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="md" showText={true} />
              </div>
              <p className="text-sm">
                AI-powered study companion for Nigerian students
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard/notes" className="hover:text-white">Notes to Quiz</Link></li>
                <li><Link href="/dashboard/quizzes" className="hover:text-white">WAEC Practice</Link></li>
                <li><Link href="/dashboard/voice" className="hover:text-white">Text-to-Speech</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Get Started</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/register" className="hover:text-white">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2025 Study Buddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
