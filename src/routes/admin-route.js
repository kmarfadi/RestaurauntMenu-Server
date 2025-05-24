const router = require('express').Router();
const Category = require('../models/Category');
const Item = require('../models/Item');
const AppError = require('../middleware/AppError');
const { verifyToken, login } = require('../config/auth');

// Login route
router.post('/login', login);

// Protected routes
router.use(verifyToken);

// Get all categories
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// Get all items
router.get('/items', async (req, res, next) => {
  try {
    const items = await Item.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// Create new category
router.post('/category', async (req, res, next) => {
  try {
    const { name, cover_image } = req.body;
    if (!name) {
      throw AppError.badRequest('Category name is required');
    }
    const category = await Category.create(name, cover_image);
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// Create new item
router.post('/item', async (req, res, next) => {
  try {
    const { name, description, price, image, category_id } = req.body;
    if (!name || !price || !category_id) {
      throw AppError.badRequest('Name, price, and category_id are required');
    }
    const item = await Item.create(name, description, price, image, category_id);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// Delete category
router.delete('/category/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Category.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Delete item
router.delete('/item/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Item.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Update item
router.put('/item/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, price } = req.body;
    if (!description && !price) {
      throw AppError.badRequest('At least one field (description or price) is required');
    }
    const item = await Item.update(id, description, price);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;