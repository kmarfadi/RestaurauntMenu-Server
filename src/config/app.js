const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Item = require('../models/Item');
const clientRoutes = require('../routes/client-route');
const adminRoutes = require('../routes/admin-route');
const uploadRoutes = require('../routes/upload-route');
const errorHandler = require('../middleware/error-handler');
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// API routes
app.use('/upload', uploadRoutes);
app.use('/', clientRoutes);
app.use('/admin', adminRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Not Found',
      status: 404
    }
  });
});

module.exports = app;