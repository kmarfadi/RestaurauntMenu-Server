require('dotenv').config();
const { DataSource } = require('typeorm');

// Parse DATABASE_URL if it exists, otherwise use individual parameters
let dbConfig = {};
const isLocalhost = process.env.DATABASE_URL && (process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1'));

if (process.env.DATABASE_URL) {
  try {
    // Try to parse the URL and extract individual components
    const url = new URL(process.env.DATABASE_URL);
    dbConfig = {
      type: 'postgres',
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      username: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
      // Only use SSL for non-localhost connections
      ssl: isLocalhost ? false : {
        rejectUnauthorized: true,
      },
    };
  } catch (error) {
    console.warn('Failed to parse DATABASE_URL, using as connection string');
    dbConfig = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // Only use SSL for non-localhost connections
      ssl: isLocalhost ? false : {
        rejectUnauthorized: true,
      },
    };
  }
} else {
  dbConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'restaurant_menu',
    // Only use SSL for non-localhost connections
    ssl: false,
  };
}

const AppDataSource = new DataSource({
  ...dbConfig,
  synchronize: false, // We'll use migrations instead
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/entities/*.ts', 'src/entities/*.js'],
  migrations: ['src/migrations/*.ts', 'src/migrations/*.js'],
  subscribers: ['src/subscribers/*.ts', 'src/subscribers/*.js'],
});

module.exports = AppDataSource;
