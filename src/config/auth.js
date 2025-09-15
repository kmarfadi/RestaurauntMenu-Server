const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../middleware/AppError');

const ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'password123', 10),
};

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw AppError.unauthorized('No token provided');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        throw AppError.unauthorized('Invalid token');
      }
      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};

// Login handler
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN.username) {
      throw AppError.unauthorized('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, ADMIN.passwordHash);
    if (!isMatch) {
      throw AppError.unauthorized('Invalid username or password');
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verifyToken,
  login,
  ADMIN,
  JWT_SECRET
}; 