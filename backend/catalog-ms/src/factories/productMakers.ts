import { CreateProductController } from "../adapters/controllers/products/CreateProductController"
import { DeleteProductController } from "../adapters/controllers/products/DeleteProductController"
import { GetProductByIdController } from "../adapters/controllers/products/GetProductByIdController"
import { GetProductsController } from "../adapters/controllers/products/GetProductsController"
import { ModifyProductByIdController } from "../adapters/controllers/products/ModifyProductByIdController"
import { CreateProductUseCase } from "../application/useCases/products/CreateProductUseCase"
import { DeleteProductUseCase } from "../application/useCases/products/DeleteProductUseCase"
import { GetProductByIdUseCase } from "../application/useCases/products/GetProductByIdUseCase"
import { GetProductsUseCase } from "../application/useCases/products/GetProductsUseCase"
import { ModifyProductByIdUseCase } from "../application/useCases/products/ModifyProductByIdUseCase"
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

export const makeGetProducts = () =>{
  const useCase = new GetProductsUseCase(productRepo)
  return new GetProductsController(useCase)
}

export const makeGetProductById = () =>{
  const useCase = new GetProductByIdUseCase(productRepo)
  return new GetProductByIdController(useCase)
}

export const makeModifyProductById = () =>{
  const useCase = new ModifyProductByIdUseCase(productRepo, categoryRepo)
  return new ModifyProductByIdController(useCase)
}

export const makeDeleteProduct = () =>{
  const useCase = new DeleteProductUseCase(productRepo)
  return new DeleteProductController(useCase)
}