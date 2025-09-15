const router = require('express').Router();
const Category = require('../models/Category');
const Item = require('../models/Item');
const AppError = require('../middleware/AppError');
const { verifyToken, login } = require('../config/auth');
const cloudinary = require("../utils/cloudinary");
const upload = require('../utils/imageUpload');

// Login route
router.post('/login', login);

// Protected routes
router.use(verifyToken);

//===================== Cloudinary CONFIG =========================//
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//===================== UPLOAD IMAGE =========================//
router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    const buffer = req.file.buffer.toString('base64');
    const base64Image = `data:${req.file.mimetype};base64,${buffer}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'uploads',
      transformation: [
        { width: 800, height: 800, crop: 'limit' }, // resize
        { quality: "auto" },                        // auto quality
        { fetch_format: "auto" }                    // auto format (webp, etc)
      ]
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    res.status(500).json({ error: 'ERROR UPLOADING IMAGE TO CLOUDINARY' });
    next(error);
  }
});

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