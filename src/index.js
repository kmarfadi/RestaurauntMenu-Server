const app = require('./config/app');

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    try {
      console.log('Server is running on port ' + port);
    } catch (error) {
      console.error('Error starting server:', error);
    }
  });
}

// Export for serverless
module.exports = app;
