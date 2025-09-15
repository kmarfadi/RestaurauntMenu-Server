// Enhanced CategorySeeder.ts
import { DataSource } from 'typeorm';
import { Category } from '../entities/Category';

export class CategorySeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    const categories = [
      {
        name: 'Appetizers',
        cover_image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=500',
      },
      {
        name: 'Soups & Salads',
        cover_image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
      },
      {
        name: 'Main Courses',
        cover_image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
      },
      {
        name: 'Pasta & Risotto',
        cover_image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500',
      },
      {
        name: 'Seafood',
        cover_image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
      },
      {
        name: 'Desserts',
        cover_image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
      },
      {
        name: 'Beverages',
        cover_image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500',
      },
      {
        name: 'Coffee & Tea',
        cover_image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
      },
    ];

    for (const categoryData of categories) {
      const existingCategory = await categoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (!existingCategory) {
        const category = categoryRepository.create(categoryData);
        await categoryRepository.save(category);
        console.log(`✅ Created category: ${categoryData.name}`);
      } else {
        console.log(`ℹ️  Category already exists: ${categoryData.name}`);
      }
    }
  }
}
