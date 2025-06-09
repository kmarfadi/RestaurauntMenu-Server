const app = require('./config/app');

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  }).on('error', (error) => {
    console.error('Error starting server:', error);
    process.exit(1);
  });
}

// Wrap the app in an error boundary for serverless
const handler = async (req, res) => {
  try {
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      error: {
        message: 'Internal Server Error',
        status: 500
      }
    });
  }
};

// Export for serverless
module.exports = handler;
