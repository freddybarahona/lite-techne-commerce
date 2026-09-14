import { Repository } from "typeorm";
import { Product } from "../../domain/entities/product";
import { IProductRepository } from "./product.repository.interface";

export class ProductRepository implements IProductRepository{

  constructor(private readonly repository: Repository<Product>){}

  async createProduct({entity}:{entity: Product}): Promise<Product>{
    const product = await this.repository.findOne({where:{product_id: entity.product_id}, withDeleted: true})
    if(product?.deleted_at){
      await this.repository.restore(product.product_id)
      const fixed= await this.repository.findOneBy({product_id: product.product_id})
      return fixed!
    }
    return this.repository.save(await this.repository.create(entity))
  }

  async ifExistsProductByName({name}:{name: string}): Promise<Boolean>{
    return this.repository.existsBy({name: name})
  }

  async getAllProducts(): Promise<Product[]>{
    return this.repository.find()
  }

  async getProductById({id}:{id: number}): Promise<Product | null>{
    return this.repository.findOne({where:{product_id: id}, relations: {category: true}})
  }

  async modProductById({entity}:{entity: Product}): Promise<Product>{
    return this.repository.save(entity)
  }

  async deleteProduct({id}:{id: number}): Promise<Boolean>{
    const result= await this.repository.softDelete(id)
    return result.affected ? true : false
  }

}