import { DataSource } from 'typeorm';
import { Item } from '../entities/Item';
import { Category } from '../entities/Category';

export class ItemSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const itemRepository = dataSource.getRepository(Item);
    const categoryRepository = dataSource.getRepository(Category);

    // Get categories to associate items with
    const appetizers = await categoryRepository.findOne({ where: { name: 'Appetizers' } });
    const soupsSalads = await categoryRepository.findOne({ where: { name: 'Soups & Salads' } });
    const mainCourses = await categoryRepository.findOne({ where: { name: 'Main Courses' } });
    const pastaRisotto = await categoryRepository.findOne({ where: { name: 'Pasta & Risotto' } });
    const seafood = await categoryRepository.findOne({ where: { name: 'Seafood' } });
    const desserts = await categoryRepository.findOne({ where: { name: 'Desserts' } });
    const beverages = await categoryRepository.findOne({ where: { name: 'Beverages' } });
    const coffeeTea = await categoryRepository.findOne({ where: { name: 'Coffee & Tea' } });

    const items = [
      // Appetizers
      {
        name: 'Buffalo Wings',
        description: 'Crispy chicken wings tossed in our signature buffalo sauce, served with celery sticks and blue cheese dip',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1567620832904-9fe5cf23db13?w=500',
        category_id: appetizers?.id,
      },
      {
        name: 'Loaded Nachos',
        description: 'Crispy tortilla chips topped with melted cheese, jalapeños, sour cream, guacamole, and pico de gallo',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1599974579688-8dbddbebbd01?w=500',
        category_id: appetizers?.id,
      },
      {
        name: 'Garlic Bread',
        description: 'Fresh baked bread with garlic butter, herbs, and melted mozzarella cheese',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500',
        category_id: appetizers?.id,
      },
      {
        name: 'Bruschetta',
        description: 'Toasted bread topped with fresh tomatoes, basil, garlic, and balsamic glaze',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=500',
        category_id: appetizers?.id,
      },

      // Soups & Salads
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce, parmesan cheese, croutons, and our house-made caesar dressing',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
        category_id: soupsSalads?.id,
      },
      {
        name: 'Greek Salad',
        description: 'Mixed greens, tomatoes, cucumbers, olives, feta cheese, and greek dressing',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        category_id: soupsSalads?.id,
      },
      {
        name: 'Tomato Basil Soup',
        description: 'Creamy tomato soup with fresh basil, served with a side of garlic bread',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
        category_id: soupsSalads?.id,
      },
      {
        name: 'Chicken Noodle Soup',
        description: 'Homestyle chicken soup with egg noodles, carrots, celery, and herbs',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
        category_id: soupsSalads?.id,
      },

      // Main Courses
      {
        name: 'Grilled Ribeye Steak',
        description: '12oz premium ribeye steak grilled to perfection, served with roasted vegetables and mashed potatoes',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
        category_id: mainCourses?.id,
      },
      {
        name: 'Chicken Parmesan',
        description: 'Breaded chicken breast topped with marinara sauce and mozzarella, served over pasta',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500',
        category_id: mainCourses?.id,
      },
      {
        name: 'BBQ Ribs',
        description: 'Slow-cooked pork ribs with our signature BBQ sauce, served with coleslaw and fries',
        price: 26.99,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
        category_id: mainCourses?.id,
      },
      {
        name: 'Grilled Chicken Breast',
        description: 'Herb-marinated chicken breast with roasted vegetables and wild rice',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500',
        category_id: mainCourses?.id,
      },

      // Pasta & Risotto
      {
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with eggs, parmesan, pancetta, and black pepper',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500',
        category_id: pastaRisotto?.id,
      },
      {
        name: 'Fettuccine Alfredo',
        description: 'Creamy fettuccine pasta with parmesan cheese and butter sauce',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500',
        category_id: pastaRisotto?.id,
      },
      {
        name: 'Mushroom Risotto',
        description: 'Creamy arborio rice with wild mushrooms, parmesan, and white wine',
        price: 20.99,
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500',
        category_id: pastaRisotto?.id,
      },
      {
        name: 'Penne Arrabbiata',
        description: 'Spicy penne pasta with tomatoes, garlic, red chili peppers, and olive oil',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500',
        category_id: pastaRisotto?.id,
      },

      // Seafood
      {
        name: 'Grilled Atlantic Salmon',
        description: 'Fresh salmon fillet grilled with lemon herb butter, served with asparagus and quinoa',
        price: 28.99,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
        category_id: seafood?.id,
      },
      {
        name: 'Fish & Chips',
        description: 'Beer-battered cod with crispy fries, coleslaw, and tartar sauce',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500',
        category_id: seafood?.id,
      },
      {
        name: 'Shrimp Scampi',
        description: 'Large shrimp sautéed in garlic, white wine, and butter, served over linguine',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
        category_id: seafood?.id,
      },
      {
        name: 'Lobster Roll',
        description: 'Fresh lobster meat with mayo and herbs in a toasted brioche bun, served with fries',
        price: 32.99,
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500',
        category_id: seafood?.id,
      },

      // Desserts
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
        category_id: desserts?.id,
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
        category_id: desserts?.id,
      },
      {
        name: 'New York Cheesecake',
        description: 'Rich and creamy cheesecake with graham cracker crust and berry compote',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
        category_id: desserts?.id,
      },
      {
        name: 'Apple Pie',
        description: 'Homemade apple pie with cinnamon and nutmeg, served warm with vanilla ice cream',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500',
        category_id: desserts?.id,
      },

      // Beverages
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500',
        category_id: beverages?.id,
      },
      {
        name: 'Cranberry Juice',
        description: 'Pure cranberry juice',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500',
        category_id: beverages?.id,
      },
      {
        name: 'Iced Tea',
        description: 'Refreshing iced tea with lemon',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500',
        category_id: beverages?.id,
      },
      {
        name: 'Sparkling Water',
        description: 'Premium sparkling water with lemon',
        price: 2.49,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500',
        category_id: beverages?.id,
      },

      // Coffee & Tea
      {
        name: 'Espresso',
        description: 'Rich and bold Italian espresso',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
        category_id: coffeeTea?.id,
      },
      {
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and foam',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
        category_id: coffeeTea?.id,
      },
      {
        name: 'Latte',
        description: 'Espresso with steamed milk and a light layer of foam',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
        category_id: coffeeTea?.id,
      },
      {
        name: 'Green Tea',
        description: 'Premium green tea leaves',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
        category_id: coffeeTea?.id,
      },
    ];

    for (const itemData of items) {
      if (!itemData.category_id) continue; // Skip if category not found

      const existingItem = await itemRepository.findOne({
        where: { name: itemData.name },
      });

      if (!existingItem) {
        const item = itemRepository.create(itemData);
        await itemRepository.save(item);
        console.log(`✅ Created item: ${itemData.name} - $${itemData.price}`);
      } else {
        console.log(`ℹ️  Item already exists: ${itemData.name}`);
      }
    }
  }
}
