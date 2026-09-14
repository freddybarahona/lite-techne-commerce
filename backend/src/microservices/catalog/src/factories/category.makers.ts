import { Category } from "../domain/entities/category";
import { CategoryControllers } from "../features/category/category.controller";
import { CategoryRepository } from "../features/category/category.repository";
import { CategoryUseCases } from "../features/category/category.use.cases";
import AppDataSource from "../infrastructure/config/database/data.source";
import { Environment } from "../core/config/env/env";

export class CategoryMakers{
  constructor(
    private readonly env: Environment,
  ){}
  async instance(): Promise<CategoryControllers>{
    const source= new AppDataSource().validate_instance()
    const categoryRepo= source.getRepository(Category)

    const useCase = new CategoryUseCases(new CategoryRepository(categoryRepo))
    return new CategoryControllers(useCase)
  }
}