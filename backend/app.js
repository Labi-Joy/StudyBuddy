require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const connectDB = require('./src/config/db');

// Initialize passport Google strategy
require('./src/config/passport');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Health check endpoint (for monitoring/keeping server alive)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'StudyBuddy API',
    version: '1.0.0',
    endpoints: ['/api/auth', '/api/notes', '/api/quiz', '/api/auth/chat', '/api/auth/voice']
  });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/notes', require('./src/routes/notes'));
app.use('/api/quiz', require('./src/routes/quiz'));
app.use('/api/auth/chat', require('./src/routes/chat'));
app.use('/api/auth/voice', require('./src/routes/voice'));

// Error handler 
app.use(require('./src/middlewares/errorHandler'));

const PORT = process.env.PORT || 4000;

// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server', err);
    process.exit(1);
  });
