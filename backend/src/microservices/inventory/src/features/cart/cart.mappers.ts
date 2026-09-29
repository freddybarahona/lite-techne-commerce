import { Cart } from "../../domain/entities/cart"
import { CartDTO } from "../DTOs/cart.DTO"


export class CartMapper{
   static mapDTO(params:{entity: Cart}): CartDTO{
    return {
      cart_id: params.entity.cart_id,
      customer_id: params.entity.customer_id,
      product_id: params.entity.product_id,
      quantity: params.entity.quantity,
      created_at: params.entity.created_at
    }
  }

  static mapEnt<T>(params:{request: T, customer_id: number}): Cart{
    const product = Object.assign(new Cart(), params.request, {customer_id: params.customer_id})
    console.log(product)
    return product
  }
}