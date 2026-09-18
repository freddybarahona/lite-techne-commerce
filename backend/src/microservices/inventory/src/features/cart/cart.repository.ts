import { Repository } from "typeorm";
import { Cart } from "../../domain/entities/cart";
import { ICartRepository } from "./cart.repository.interface";

export class CartRepository implements ICartRepository{
  constructor(
    private repository: Repository<Cart>,
  ){}

  async createCart({entity}:{entity: Cart}): Promise<Cart> {
    const result= this.repository.create(entity)
    return this.repository.save(result)
  }

  async getCartById({id}:{id: number}): Promise<Cart | null> {
    return await this.repository.findOneBy({cart_id: id})
  }

  async updateCart({entity}:{entity: Cart}): Promise<Cart> {
    return await this.repository.save(entity)
  }

  async deleteCart({id}:{id: number}): Promise<boolean> {
    const result= await this.repository.delete(id)
    return result.affected ? true : false
  }
}