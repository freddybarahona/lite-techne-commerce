import { Product } from "../domain/entities/product";
import { Category } from "../domain/entities/category";
import { ProductControllers } from "../features/product/product.controller";
import { ProductRepository } from "../features/product/product.repository";
import { CategoryRepository } from "../features/category/category.repository";
import { ProductUseCases } from "../features/product/product.use.cases";
import AppDataSource from "../infrastructure/config/database/data.source";
import { Environment } from "../core/config/env/env";

export class ProductMakers{
  constructor(
    private readonly env: Environment,
  ){}
  async instance(): Promise<ProductControllers>{
    const source= new AppDataSource().validate_instance()
    const productRepo= source.getRepository(Product)
    const categoryRepo= source.getRepository(Category)

    const useCase = new ProductUseCases(
      new ProductRepository(productRepo),
      new CategoryRepository(categoryRepo)
    )
    return new ProductControllers(useCase)
  }
}