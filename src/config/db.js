const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// PostgreSQL setup
// Check if it's a local connection and disable SSL accordingly
const isLocalhost = process.env.DATABASE_URL && (
  process.env.DATABASE_URL.includes('localhost') || 
  process.env.DATABASE_URL.includes('127.0.0.1')
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocalhost ? false : {
    rejectUnauthorized: true, // Set to false if you don't want to reject unauthorized certificates
  }
});

module.exports = { pool };

