#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up database with TypeORM...\n');

try {
  // Check if .env file exists
  if (!fs.existsSync('.env')) {
    console.error('❌ .env file not found. Please create one with your DATABASE_URL.');
    process.exit(1);
  }

  console.log('📦 Building TypeScript...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n🗄️  Running migrations...');
  execSync('npm run migration:run', { stdio: 'inherit' });

  console.log('\n🌱 Seeding database with test data...');
  execSync('npm run seed', { stdio: 'inherit' });

  console.log('\n✅ Database setup completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('   1. Start the development server: npm run dev');
  console.log('   2. Your API will be available at http://localhost:3008');
  console.log('   3. Check the TYPEORM_MIGRATION_GUIDE.md for more details');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('   1. Make sure your DATABASE_URL is correct in .env');
  console.log('   2. Ensure your database server is running');
  console.log('   3. Check if tables already exist (may need manual cleanup)');
  process.exit(1);
}
