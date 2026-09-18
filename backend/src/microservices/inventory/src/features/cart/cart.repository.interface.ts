import { Cart } from "../../domain/entities/cart";

export interface ICartRepository{
  createCart({entity}:{entity: Cart}): Promise<Cart>
  getCartById({id}:{id: number}): Promise<Cart | null>
  deleteCart({id}:{id: number}): Promise<boolean>
}