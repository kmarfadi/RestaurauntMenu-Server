const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// PostgreSQL setup
// DB currently uses SSL, so we need to set up the connection accordingly
// DB is hosted on AIVEN at the moment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true, // Set to false if you don't want to reject unauthorized certificates
  }
});

module.exports = { pool };

