import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from '../entities/Category';
import { Item } from '../entities/Item';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
  entities: [Category, Item],
  synchronize: false, // We use migrations
  logging: process.env.NODE_ENV === 'development',
});

let isInitialized = false;

export const initializeDatabase = async (): Promise<DataSource> => {
  if (!isInitialized) {
    await AppDataSource.initialize();
    isInitialized = true;
    console.log('Database connection established');
  }
  return AppDataSource;
};

export const getDataSource = (): DataSource => {
  if (!isInitialized) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return AppDataSource;
};

export default AppDataSource;
