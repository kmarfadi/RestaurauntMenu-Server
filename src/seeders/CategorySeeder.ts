// Enhanced CategorySeeder.ts
import { DataSource } from 'typeorm';
import { Category } from '../entities/Category';

export class CategorySeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    const categories = [
      {
        name: 'Classic Pizzas',
        cover_image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=500',
      },
      {
        name: 'Gourmet Pizzas',
        cover_image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=500',
      },
      {
        name: 'Appetizers',
        cover_image: 'https://images.pexels.com/photos/4109278/pexels-photo-4109278.jpeg?auto=compress&cs=tinysrgb&w=500',
      },
      {
        name: 'Salads',
        cover_image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
      },
      {
        name: 'Desserts',
        cover_image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=500',
      },
      {
        name: 'Beverages',
        cover_image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=500',
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
