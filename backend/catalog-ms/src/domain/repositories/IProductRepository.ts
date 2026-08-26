import { Product } from "../entities/product";

export interface IProductRepository{
  createProduct(data: Product): Promise<Product>
  ifExistsProductByName(data: string): Promise<Boolean>
  getAllProducts(): Promise<Product[]>
  getProductById(data: number): Promise<Product | null>
  modProductById(data: Product): Promise<Product>
  deleteProduct(data: number): Promise<Boolean>
}