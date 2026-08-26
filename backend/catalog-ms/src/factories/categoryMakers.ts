import { CreateCategoryController } from "../adapters/controllers/categories/CreateCategoryController"
import { GetCategoriesController } from "../adapters/controllers/categories/GetCategoriesController"
import { CreateCategoryUseCase } from "../application/useCases/categories/CreateCategoryUseCase"
import { GetCategoriesUseCase } from "../application/useCases/categories/GetCategoriesUseCase"
import { Category } from "../domain/entities/category"
import { CategoryRepository } from "../infrastructure/config/database/CategoryRepository"
import { AppdDataSource } from "../infrastructure/config/database/dataSource"

const dataSource = AppdDataSource.getRepository(Category)
const categoryRepo = new CategoryRepository(dataSource)

export const makeCreateCategory = ()=>{
  const useCase = new CreateCategoryUseCase(categoryRepo)
  return new CreateCategoryController(useCase)
}

export const makeGetCategories = () =>{
  const useCase = new GetCategoriesUseCase(categoryRepo)
  return new GetCategoriesController(useCase)
}