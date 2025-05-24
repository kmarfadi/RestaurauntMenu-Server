const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Item = require('../models/Item');
const clientRoutes = require('../routes/client-route');
const adminRoutes = require('../routes/admin-route');
const uploadRoutes =  require('../routes/upload-route');
const errorHandler = require('../middleware/error-handler');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/upload', uploadRoutes);
app.use('/', clientRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;