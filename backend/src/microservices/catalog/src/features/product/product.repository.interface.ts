import { Product } from "../../domain/entities/product";

export interface IProductRepository{
  createProduct({entity}:{entity: Product}): Promise<Product>
  ifExistsProductByName({name}:{name: string}): Promise<Boolean>
  getAllProducts(): Promise<Product[]>
  getProductById({id}:{id: number}): Promise<Product | null>
  modProductById({entity}:{entity: Product}): Promise<Product>
  deleteProduct({id}:{id: number}): Promise<Boolean>
}