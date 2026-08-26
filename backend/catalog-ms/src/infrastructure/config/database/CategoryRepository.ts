import { Repository } from "typeorm";
import { Category } from "../../../domain/entities/category";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { AppdDataSource } from "./dataSource";
import { DeleteResult } from "typeorm/browser";

export class CategoryRepository implements ICategoryRepository{

  constructor(private readonly repository: Repository<Category>){
    this.repository= AppdDataSource.getRepository(Category)
  }
  async deleteCategory(data: number): Promise<Boolean> {
    const result = await this.repository.softDelete(data)? true : false
    return result
  }
  async modCategoryById(data: Category): Promise<Category> {
    const result = await this.repository.save(data)
    return result
  }

  async getCategoryById(data: number): Promise<Category | null> {
    const result= await this.repository.findOne({where:{category_id: data}, relations: {product: true}})
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
    const category = await this.repository.findOne({where:{category_id: data.category_id}, withDeleted: true})
    if(category?.deleted_at){
     await this.repository.restore(category.category_id)
     const fixed =await this.repository.findOneBy({category_id: category.category_id})
     return fixed!
    }
    const result = await this.repository.save(await this.repository.create(data))
    return result
  }

}