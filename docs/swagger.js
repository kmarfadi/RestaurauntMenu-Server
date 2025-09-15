const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

/**
 * Swagger configuration options
 */
const options = {
  definition: swaggerDocument,
  apis: ['./src/routes/*.js'], // Path to the API files
};

/**
 * Generate Swagger specification
 */
const specs = swaggerJsdoc(options);

/**
 * Swagger UI configuration
 */
const swaggerUiOptions = {
  customSiteTitle: 'Marf Pizza API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    requestInterceptor: (req) => {
      // Add custom headers if needed
      return req;
    },
    responseInterceptor: (res) => {
      // Process responses if needed
      return res;
    }
  }
};

module.exports = {
  specs,
  swaggerUi,
  swaggerUiOptions,
  swaggerDocument
};
