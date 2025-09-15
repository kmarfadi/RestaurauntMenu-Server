const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// PostgreSQL setup
exports.pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//module.exports = { pool };

