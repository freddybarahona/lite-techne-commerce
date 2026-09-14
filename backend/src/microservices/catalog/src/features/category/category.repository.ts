import { Repository } from "typeorm";
import { Category } from "../../domain/entities/category";
import { ICategoryRepository } from "./category.repository.interface";

export class CategoryRepository implements ICategoryRepository{

  constructor(private readonly repository: Repository<Category>){}

  async createCategory({entity}:{entity: Category | Omit<Category, "created_at" | "deleted_at" | "product">}): Promise<Category>{
    return this.repository.save(await this.repository.create(entity))
  }

  async ifExistsCategoryByName({name}:{name: string}): Promise<Boolean>{
    return this.repository.existsBy({name: name})
  }

  async getAllCategories(): Promise<Category[]>{
    return this.repository.find()
  }

  async getCategoryById({id}:{id: number}): Promise<Category | null>{
    return this.repository.findOne({where:{category_id: id}, relations: {product: true}})
  }

  async modCategoryById({entity}:{entity: Category}): Promise<Category>{
    return this.repository.save(entity)
  }

  async deleteCategory({id}:{id: number}): Promise<Boolean>{
    const result= await this.repository.softDelete(id)
    return result.affected ? true : false
  }

}