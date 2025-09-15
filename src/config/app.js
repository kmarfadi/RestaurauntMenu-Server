const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const clientRoutes = require('../routes/client-route');
const adminRoutes = require('../routes/admin-route');
const uploadRoutes = require('../routes/upload-route');
const errorHandler = require('../middleware/error-handler');
const { swaggerUi, swaggerUiOptions, swaggerDocument } = require('../../docs/swagger');
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
}));
// Middleware setup
app.use(express.json());
// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

// API routes
app.use('/api/upload', uploadRoutes);
app.use('/api/', clientRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Initialize database connection

module.exports = app;