# TypeORM Migration Guide

This project has been migrated from raw SQL queries to TypeORM with migrations and seeders for better database management and robustness.

## Setup

### 1. Install Dependencies
All required dependencies have been installed:
- `typeorm` - ORM framework
- `reflect-metadata` - Required for decorators
- `pg` - PostgreSQL driver
- `ts-node` - TypeScript execution
- `typescript` - TypeScript compiler

### 2. Database Configuration
The database configuration is now managed through:
- `ormconfig.js` - TypeORM configuration
- `src/config/database.ts` - Database connection service

## Available Scripts

### Migration Commands
```bash
# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# Generate a new migration (after entity changes)
npm run migration:generate src/migrations/MigrationName
```

### Seeding Commands
```bash
# Run seeders to populate database with test data
npm run seed
```

### Development Commands
```bash
# Start development server
npm run dev

# Build TypeScript
npm run build

# Start production server
npm run start:prod
```

## Project Structure

```
src/
├── entities/           # TypeORM entities (Category.ts, Item.ts)
├── migrations/         # Database migration files
├── seeders/           # Database seeder files
├── services/          # Business logic services
├── config/            # Configuration files
└── routes/            # API routes (updated to use services)
```

## Usage

### 1. Database Setup
**IMPORTANT:** You need a working PostgreSQL database first!

**Option A: Local Database with Docker (Recommended)**
```bash
# Start local PostgreSQL database
./scripts/setup-local-db.sh

# This will:
# - Start PostgreSQL in Docker
# - Create the restaurant_menu database
# - Update your .env file with the correct DATABASE_URL
```

**Option B: Use Existing Database**
Update your `.env` file with the correct DATABASE_URL:
```env
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### 2. Running Migrations
After database setup, run the initial migration:

```bash
npm run migration:run
```

This will create the `categories` and `items` tables with proper relationships.

### 2. Seeding Test Data
After running migrations, you can populate the database with test data:

```bash
npm run seed
```

This will create sample categories (Appetizers, Main Courses, Desserts, Beverages) and items.

### 3. Development
Start the development server:

```bash
npm run dev
```

## Entity Relationships

- **Category** (1) ↔ (Many) **Item**
- Each item belongs to one category
- Categories can have multiple items

## Migration Files

- `1700000000000-InitialSchema.ts` - Creates the initial database schema

## Seeder Files

- `CategorySeeder.ts` - Seeds categories table
- `ItemSeeder.ts` - Seeds items table with sample menu items
- `index.ts` - Main seeder runner

## API Endpoints

All existing API endpoints remain the same, but now use TypeORM services:

### Admin Routes (Protected)
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/category` - Create new category
- `DELETE /api/admin/category/:id` - Delete category
- `GET /api/admin/items` - Get all items
- `POST /api/admin/item` - Create new item
- `PUT /api/admin/item/:id` - Update item
- `DELETE /api/admin/item/:id` - Delete item

### Client Routes
- `GET /api/menu` - Get menu (categories and items)
- `POST /api/checkout` - Process checkout

## Environment Variables

Make sure your `.env` file contains:

```env
DATABASE_URL=postgresql://username:password@host:port/database
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

## Benefits of TypeORM Migration

1. **Type Safety** - TypeScript support with proper typing
2. **Migrations** - Version-controlled database schema changes
3. **Relationships** - Proper entity relationships with foreign keys
4. **Seeders** - Easy test data management
5. **Query Builder** - More flexible and type-safe queries
6. **Active Record Pattern** - Cleaner service layer
7. **Database Agnostic** - Easy to switch databases if needed

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - **Most Common:** DATABASE_URL has placeholder values like `host:port`
   - **Solution:** Update `.env` with real database connection details
   - **Quick Fix:** Use Docker setup: `./scripts/setup-local-db.sh`
   - Verify `DATABASE_URL` in `.env`
   - Check if database server is running
   - Ensure SSL settings are correct for production

2. **Migration Issues**
   - **Error:** "Cannot read properties of undefined (reading 'searchParams')"
   - **Cause:** Invalid DATABASE_URL format
   - **Solution:** Fix DATABASE_URL in `.env` file
   - Make sure database is accessible
   - Check if tables already exist (may need to drop manually)
   - Verify entity imports in `ormconfig.js`

3. **TypeScript Issues**
   - Run `npm run build` to check for compilation errors
   - Ensure all imports are correct
   - Check `tsconfig.json` configuration

### Quick Setup for Development
```bash
# 1. Set up local database
./scripts/setup-local-db.sh

# 2. Run migrations
npm run migration:run

# 3. Seed test data
npm run seed

# 4. Start development server
npm run dev
```

### Manual Database Reset
If you need to reset the database:

```sql
-- Connect to your database and run:
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;
```

Then run migrations again:
```bash
npm run migration:run
npm run seed
```
