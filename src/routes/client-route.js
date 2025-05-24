const router = require('express').Router();
const Category = require('../models/Category');
const Item = require('../models/Item');
const { pool } = require('../config/db');
const AppError = require('../middleware/AppError');

router.get('/menu', async (req, res, next) => {
  try {
    const [categories, items] = await Promise.all([
      Category.getAll(),
      Item.getAll()
    ]);
    res.json({ categories, items });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
});

router.get('/branches', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM branches');
    if (!result.rows.length) {
      throw AppError.notFound('No branches found');
    }
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.post('/checkout', async (req, res, next) => {
  try {
    const { name, address, cart, branch_id } = req.body;

    if (!name || !address || !cart || !branch_id) {
      throw AppError.badRequest('Missing required fields');
    }

    const branchNumbers = {
      1: '+967777858820',
      2: '+967779595956'
    };

    const number = branchNumbers[branch_id];
    if (!number) {
      throw AppError.notFound('Branch not found');
    }

    const itemLines = cart.map(item => `• ${item.name} x${item.qty}`).join('\n');
    const message = `طلب من _*${name}*_\nالعنوان: _*${address}*_ \n\الطلب:\n${itemLines}`;
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${number}?text=${encodedMsg}`;

    res.json({ whatsappUrl });
  } catch (err) {
    next(err);
  }
});

module.exports = router;