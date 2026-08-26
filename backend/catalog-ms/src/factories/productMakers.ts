import { CreateProductController } from "../adapters/controllers/products/CreateProductController"
import { CreateProductUseCase } from "../application/useCases/products/CreateProductUseCase"
import { Category } from "../domain/entities/category"
import { Product } from "../domain/entities/product"
import { CategoryRepository } from "../infrastructure/config/database/CategoryRepository"
import { AppdDataSource } from "../infrastructure/config/database/dataSource"
import { ProductRepository } from "../infrastructure/config/database/ProductRepository"

const dataSource = AppdDataSource.getRepository(Product)
const productRepo = new ProductRepository(dataSource)

const catSource = AppdDataSource.getRepository(Category)
const categoryRepo= new CategoryRepository(catSource)
export const makeCreateProduct =()=>{
  const useCase = new CreateProductUseCase(productRepo, categoryRepo)
  return new CreateProductController(useCase)
}