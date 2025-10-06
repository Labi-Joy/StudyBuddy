# 📚 Study-Buddy - Your AI-Powered WAEC Prep Companion

> "Making WAEC Success Accessible to Every Nigerian Student"

## 🎯 The Problem We're Solving

In Nigeria, WAEC is one of the most important exams for secondary school students. Unfortunately, many students struggle—not because they aren't intelligent, but because of **limited access to proper study resources, tutors, or practice questions**.

Students often rely solely on class notes, wishing they had:
- Someone to turn their notes into practice questions
- Help to explain tough concepts
- A way to stay motivated during revision

**Study-Buddy bridges that gap.** It's the intelligent, affordable study companion every student deserves—right in their hands.

---

## ✨ What is Study-Buddy?

Study-Buddy is an **AI-powered WAEC preparation tool** that helps Nigerian secondary school students prepare effectively for their exams. Think of it as your personal tutor, quiz master, and study motivator—all in one.

### 🚀 Key Features

#### 1. 📝 **Upload & Quiz Generation**
- Upload your study notes (PDF, DOCX, TXT, or Images)
- AI automatically generates quizzes from your content
- Get AI-powered summaries of your notes
- Practice with MCQs, True/False questions
- Listen to notes with Text-to-Speech

#### 2. 📚 **WAEC Past Questions**
- Access AI-generated WAEC-style questions
- Department-specific quizzes (Science, Commercial, Arts)
- Instant feedback and detailed explanations
- Track your progress

#### 3. 💬 **AI Chatbot Tutor**
- Ask questions anytime, 24/7
- Get explanations and clarifications
- Learn study strategies
- Chat history saved for review

#### 4. 🎤 **Text-to-Speech**
- Convert notes to audio
- Extract text from images (OCR)
- Study while commuting

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5** (React 19)
- **Tailwind CSS**
- **Zustand** (State Management)
- **Axios** (HTTP Client)

### Backend
- **Node.js + Express**
- **MongoDB** (Database)
- **OpenAI** (Quiz Generation)
- **Google Gemini** (AI Chat & Summaries)
- **Google Text-to-Speech**
- **Cloudinary** (File Storage)
- **Tesseract.js** (OCR)
- **JWT** (Authentication)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB

### 1. Clone the Repository
```bash
git clone https://github.com/Labi-Joy/StudyBuddy.git
cd StudyBuddy
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```
Backend runs on **http://localhost:4000**

### 3. Frontend Setup
```bash
cd ../frontend/study-buddy
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
npm run dev
```
Frontend runs on **http://localhost:3000**

---

## 📁 Project Structure

```
StudyBuddy/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── services/     # AI services
│   └── app.js
│
└── frontend/study-buddy/ # Next.js App
    └── src/
        ├── app/          # Pages (App Router)
        ├── components/   # React Components
        ├── lib/api/      # API Client
        └── store/        # Zustand Store
```

---

## 🎯 MVP Success Criteria

A student should be able to:
1. ✅ Sign up or log in easily
2. ✅ Upload notes and generate quizzes
3. ✅ Take WAEC past question quizzes
4. ✅ Chat with AI tutor for guidance

---

## 🗺️ Future Roadmap

- 📖 **Textbook APIs** - Search official textbooks, get chapter quizzes
- 🎮 **Gamification** - Points, badges, streaks, leaderboards
- 👥 **Study Groups** - Collaborate and challenge friends
- 📱 **Voice Mode** - Voice-based learning
- 📴 **Offline Access** - Study without internet
- 💬 **WhatsApp Integration** - Study via WhatsApp
- 👨‍👩‍👧 **Parent Dashboard** - Track student progress
- 🧠 **Smart Revision** - Flashcards, mind maps, mock exams

---

## 👥 Team

**Team 50 - Codefest Hackathon**
- **Eden Joy** - Team Lead & Full Stack Developer
- [Add other team members]

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

Built with ❤️ for Nigerian Students

- OpenAI for AI models
- Google for Gemini AI & TTS
- Cloudinary for file storage

---

<div align="center">
  <strong>Study-Buddy is not just a study app.</strong><br>
  It's a companion—a tutor, a quiz master, and a motivator—<br>
  designed to make sure no student faces WAEC alone.
</div>
