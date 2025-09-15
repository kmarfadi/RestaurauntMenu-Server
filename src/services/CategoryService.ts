import { Repository } from 'typeorm';
import { Category } from '../entities/Category';

export class CategoryService {
  constructor(private categoryRepository: Repository<Category>) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['items'],
    });
  }

  async create(name: string, cover_image?: string): Promise<Category> {
    const category = this.categoryRepository.create({
      name,
      cover_image,
    });
    return await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async findById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { name },
    });
  }
}
