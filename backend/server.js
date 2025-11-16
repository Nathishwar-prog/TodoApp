require('dotenv').config();
require('express-async-errors'); // handle async errors
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./utils/db');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000', 'https://task8mern.netlify.app'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve frontend build files
app.use('/frontend', express.static(path.join(__dirname, '../frontend/dist')));

// API routes
app.use('/api/tasks', tasksRouter);

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Backend is running' }));

// Serve the main index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// For any other routes, serve the frontend app
app.get('/frontend/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// error handler (should be last)
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error.message);
    console.error('Server will not start without database connection');
    process.exit(1);
  });