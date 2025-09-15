import { Repository } from 'typeorm';
import { Item } from '../entities/Item';

export class ItemService {
  constructor(private itemRepository: Repository<Item>) {}

  async getAll(): Promise<Item[]> {
    return await this.itemRepository.find({
      relations: ['category'],
    });
  }

  async create(
    name: string,
    description: string | undefined,
    price: number,
    image: string | undefined,
    category_id: number
  ): Promise<Item> {
    const item = this.itemRepository.create({
      name,
      description,
      price,
      image,
      category_id,
    });
    return await this.itemRepository.save(item);
  }

  async update(
    id: number,
    description?: string,
    price?: number
  ): Promise<Item | null> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) return null;

    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;

    return await this.itemRepository.save(item);
  }

  async delete(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async findById(id: number): Promise<Item | null> {
    return await this.itemRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findByCategory(category_id: number): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { category_id },
      relations: ['category'],
    });
  }
}
