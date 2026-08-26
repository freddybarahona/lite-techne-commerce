import { CreateCategoryController } from "../adapters/controllers/categories/CreateCategoryController"
import { DeleteCategoryController } from "../adapters/controllers/categories/DeleteCategoryController"
import { GetCategoriesController } from "../adapters/controllers/categories/GetCategoriesController"
import { GetCategoryByIdController } from "../adapters/controllers/categories/GetCategoryByIdController"
import { ModifyCategoryByIdController } from "../adapters/controllers/categories/ModifyCategoryByIdController"
import { CreateCategoryUseCase } from "../application/useCases/categories/CreateCategoryUseCase"
import { DeleteCategoryUseCase } from "../application/useCases/categories/DeleteCategoryUseCase"
import { GetCategoriesUseCase } from "../application/useCases/categories/GetCategoriesUseCase"
import { GetCategoryByIdUseCase } from "../application/useCases/categories/GetCategoryByIdUseCase"
import { ModifyCategoryByIdUseCase } from "../application/useCases/categories/ModifyCategoryByIdUseCase"
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

export const makeGetCategoryById = () =>{
  const useCase = new GetCategoryByIdUseCase(categoryRepo)
  return new GetCategoryByIdController(useCase)
}

export const makeModifyCategoryById = () =>{
  const useCase = new ModifyCategoryByIdUseCase(categoryRepo)
  return new ModifyCategoryByIdController(useCase)
}

export const makeDeleteCategory = () =>{
  const useCase = new DeleteCategoryUseCase(categoryRepo)
  return new DeleteCategoryController(useCase)
}