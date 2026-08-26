import { Repository } from "typeorm";
import { Category } from "../../../domain/entities/category";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { AppdDataSource } from "./dataSource";

export class CategoryRepository implements ICategoryRepository{

  constructor(private readonly repository: Repository<Category>){
    this.repository= AppdDataSource.getRepository(Category)
  }

  async getCategoryById(data: number): Promise<Category | null> {
    const result= await this.repository.findOneBy({category_id: data})
    return result
  }

  async getAllCategories(): Promise<Category[]> {
    const result = await this.repository.find()
    return result
  }

  async ifExistsCategoryByName(data: string): Promise<Boolean> {
    const result= await this.repository.existsBy({name: data})
    return result
  }

  async createCategory(data: Category | Omit<Category, "created_at" | "deleted_at" | "product">): Promise<Category> {
    const result = await this.repository.save(await this.repository.create(data))
    return result
  }

}