// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error('Error:', err);

  // Default error status and message
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific types of errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    status = 401;
    message = 'Unauthorized access';
  } else if (err.name === 'ForbiddenError') {
    status = 403;
    message = 'Forbidden access';
  } else if (err.name === 'NotFoundError') {
    status = 404;
    message = 'Resource not found';
  }

  // Handle database errors
  if (err.code === '23505') { // Unique violation
    status = 409;
    message = 'Resource already exists';
  } else if (err.code === '23503') { // Foreign key violation
    status = 400;
    message = 'Invalid reference';
  }

  // Send clean error response
  res.status(status).json({
    message,
    status
  });
};

module.exports = errorHandler; 