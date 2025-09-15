import { DataSource } from 'typeorm';
import { Item } from '../entities/Item';
import { Category } from '../entities/Category';

export class ItemSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const itemRepository = dataSource.getRepository(Item);
    const categoryRepository = dataSource.getRepository(Category);

    // Get categories to associate items with
    const classicPizzas = await categoryRepository.findOne({ where: { name: 'Classic Pizzas' } });
    const gourmetPizzas = await categoryRepository.findOne({ where: { name: 'Gourmet Pizzas' } });
    const appetizers = await categoryRepository.findOne({ where: { name: 'Appetizers' } });
    const salads = await categoryRepository.findOne({ where: { name: 'Salads' } });
    const desserts = await categoryRepository.findOne({ where: { name: 'Desserts' } });
    const beverages = await categoryRepository.findOne({ where: { name: 'Beverages' } });

    const items = [
      // Classic Pizzas
      {
        name: 'Margherita Pizza',
        description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil',
        price: 16.99,
        image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: classicPizzas?.id,
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Traditional pepperoni pizza with mozzarella cheese and our signature tomato sauce',
        price: 18.99,
        image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: classicPizzas?.id,
      },
      {
        name: 'Supreme Pizza',
        description: 'Loaded with pepperoni, sausage, bell peppers, onions, mushrooms, and olives',
        price: 22.99,
        image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: classicPizzas?.id,
      },
      {
        name: 'Cheese Pizza',
        description: 'Simple and delicious with mozzarella cheese and our house tomato sauce',
        price: 15.99,
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: classicPizzas?.id,
      },
      {
        name: 'Hawaiian Pizza',
        description: 'Sweet and savory with ham, pineapple, and mozzarella cheese',
        price: 19.99,
        image: 'https://images.pexels.com/photos/2274787/pexels-photo-2274787.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: classicPizzas?.id,
      },

      // Gourmet Pizzas
      {
        name: 'Truffle Mushroom Pizza',
        description: 'Gourmet pizza with wild mushrooms, truffle oil, and aged parmesan',
        price: 26.99,
        image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: gourmetPizzas?.id,
      },
      {
        name: 'Prosciutto Arugula Pizza',
        description: 'Thin crust pizza with prosciutto, fresh arugula, and shaved parmesan',
        price: 24.99,
        image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: gourmetPizzas?.id,
      },
      {
        name: 'BBQ Chicken Pizza',
        description: 'Grilled chicken, red onions, and cilantro on our signature BBQ sauce base',
        price: 21.99,
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: gourmetPizzas?.id,
      },
      {
        name: 'Mediterranean Pizza',
        description: 'Artichokes, sun-dried tomatoes, kalamata olives, and feta cheese',
        price: 23.99,
        image: 'https://images.pexels.com/photos/2274787/pexels-photo-2274787.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: gourmetPizzas?.id,
      },
      {
        name: 'Four Cheese Pizza',
        description: 'Mozzarella, gorgonzola, parmesan, and ricotta cheese blend',
        price: 20.99,
        image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: gourmetPizzas?.id,
      },

      // Appetizers
      {
        name: 'Garlic Knots',
        description: 'Fresh baked dough knots brushed with garlic butter and herbs',
        price: 8.99,
        image: 'https://images.pexels.com/photos/4109278/pexels-photo-4109278.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: appetizers?.id,
      },
      {
        name: 'Buffalo Wings',
        description: 'Crispy chicken wings tossed in our signature buffalo sauce, served with celery and blue cheese',
        price: 14.99,
        image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: appetizers?.id,
      },
      {
        name: 'Mozzarella Sticks',
        description: 'Golden fried mozzarella cheese sticks served with marinara sauce',
        price: 10.99,
        image: 'https://images.pexels.com/photos/4109278/pexels-photo-4109278.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: appetizers?.id,
      },
      {
        name: 'Bruschetta',
        description: 'Toasted bread topped with fresh tomatoes, basil, garlic, and balsamic glaze',
        price: 9.99,
        image: 'https://images.pexels.com/photos/4109278/pexels-photo-4109278.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: appetizers?.id,
      },

      // Salads
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce, parmesan cheese, croutons, and house-made caesar dressing',
        price: 12.99,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500w=500w=500',
        category_id: salads?.id,
      },
      {
        name: 'Greek Salad',
        description: 'Mixed greens, tomatoes, cucumbers, olives, feta cheese, and greek dressing',
        price: 13.99,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500w=500w=500',
        category_id: salads?.id,
      },
      {
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, tomatoes, basil, and balsamic reduction',
        price: 11.99,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compresshttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500cs=tinysrgbhttps://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500w=500w=500',
        category_id: salads?.id,
      },

      // Desserts
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
        price: 7.99,
        image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: desserts?.id,
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
        price: 8.99,
        image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: desserts?.id,
      },
      {
        name: 'Cannoli',
        description: 'Crispy pastry shells filled with sweet ricotta cheese and chocolate chips',
        price: 6.99,
        image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: desserts?.id,
      },

      // Beverages
      {
        name: 'Italian Soda',
        description: 'Sparkling water with flavored syrup and cream',
        price: 4.99,
        image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: beverages?.id,
      },
      {
        name: 'Fresh Lemonade',
        description: 'Freshly squeezed lemonade with mint',
        price: 3.99,
        image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: beverages?.id,
      },
      {
        name: 'Sparkling Water',
        description: 'Premium sparkling water with lemon or lime',
        price: 2.99,
        image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: beverages?.id,
      },
      {
        name: 'Craft Beer',
        description: 'Selection of local and imported craft beers',
        price: 5.99,
        image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=500',
        category_id: beverages?.id,
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
