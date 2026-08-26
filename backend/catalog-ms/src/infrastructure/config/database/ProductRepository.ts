import { Repository } from "typeorm";
import { AppdDataSource } from "./dataSource";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { Product } from "../../../domain/entities/product";

export class ProductRepository implements IProductRepository{

  constructor(private readonly repository: Repository<Product>){
    this.repository= AppdDataSource.getRepository(Product)
  }

  async createProduct(data: Product): Promise<Product> {
    const product = await this.repository.findOne({where:{product_id: data.product_id}, withDeleted: true})
    if(product?.deleted_at){
     await this.repository.restore(product.product_id)
     const fixed =await this.repository.findOneBy({product_id: product.product_id})
     return fixed!
    }
    const result = await this.repository.save(await this.repository.create(data))
    return result
  }

  async ifExistsProductByName(data: string): Promise<Boolean> {
    const result= await this.repository.existsBy({name: data})
    return result
  }
  async getAllProducts(): Promise<Product[]> {
    const result = await this.repository.find()
    return result
  }
  async getProductById(data: number): Promise<Product | null> {
    const result= await this.repository.findOne({where:{product_id: data}, relations: {category: true}})
    return result
  }
  async modProductById(data: Product): Promise<Product> {
    const result = await this.repository.save(data)
    return result
  }
  async deleteProduct(data: number): Promise<Boolean> {
    const result = await this.repository.softDelete(data)? true : false
    return result
  }
  
}

/* 

  async getCategoryById(data: number): Promise<Category | null> {
    const result= await this.repository.findOne({where:{category_id: data}, relations: {product: true}})
    return result
  }
*/