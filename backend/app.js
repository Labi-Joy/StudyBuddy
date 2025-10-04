require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const connectDB = require('./src/config/db');

require('./src/config/passport');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/notes', require('./src/routes/notes'));
app.use('/api/quiz', require('./src/routes/quiz'));
app.use('/api/auth/chat', require('./src/routes/chat'));
app.use('/api/auth/voice', require('./src/routes/voice'));

// Error handler 
app.use(require('./src/middlewares/errorHandler'));

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Failed to start server', err);
    process.exit(1);
  });
