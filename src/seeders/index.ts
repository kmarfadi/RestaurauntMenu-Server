import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CategorySeeder } from './CategorySeeder';
import { ItemSeeder } from './ItemSeeder';

// Simple configuration that works with local PostgreSQL
const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'restaurant_db',
  ssl: false,
  entities: ['src/entities/*.ts'],
  synchronize: false,
  logging: false,
});

async function runSeeders() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Data Source has been initialized!');

    // Run seeders
    const categorySeeder = new CategorySeeder();
    await categorySeeder.run(AppDataSource);

    const itemSeeder = new ItemSeeder();
    await itemSeeder.run(AppDataSource);

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeders();
