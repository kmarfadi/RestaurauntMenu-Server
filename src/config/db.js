const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// CERTIFICATE

// PostgreSQL setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,}
});

module.exports = { pool };

