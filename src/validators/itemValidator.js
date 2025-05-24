const { body, param } = require('express-validator');
const { handleValidationErrors } = require('./baseValidator');

const itemValidators = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Item name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Item name must be between 2 and 100 characters'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters'),
    
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    
    body('category_id')
      .notEmpty()
      .withMessage('Category ID is required')
      .isInt()
      .withMessage('Invalid category ID'),
    
    handleValidationErrors
  ],

  update: [
    param('id')
      .isInt()
      .withMessage('Invalid item ID'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must not exceed 500 characters'),
    
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    
    handleValidationErrors
  ],

  delete: [
    param('id')
      .isInt()
      .withMessage('Invalid item ID'),
    handleValidationErrors
  ]
};

module.exports = itemValidators; 