const { body, param } = require('express-validator');
const { handleValidationErrors } = require('./baseValidator');

const categoryValidators = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Category name must be between 2 and 50 characters'),
    handleValidationErrors
  ],

  update: [
    param('id')
      .isInt()
      .withMessage('Invalid category ID'),
    
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Category name must be between 2 and 50 characters'),
    
    handleValidationErrors
  ],

  delete: [
    param('id')
      .isInt()
      .withMessage('Invalid category ID'),
    handleValidationErrors
  ]
};

module.exports = categoryValidators;
