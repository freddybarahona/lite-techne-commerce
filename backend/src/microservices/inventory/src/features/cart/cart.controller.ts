import { Request } from "express"
import { CartDTO } from "../DTOs/cart.DTO"
import { CartUseCases } from "./cart.use.cases"
import { CreateCartRequest } from "../requests/create.cart.request"
import { DeleteCartRequest } from "../requests/delete.cart.request"
import { UpdateCartRequest } from "../requests/update.cart.request"

export class CartControllers{
  constructor(private readonly useCase: CartUseCases){}

  async obtenerCart(req: Request){
    const customer_id= (req as any).user.id
    return await this.useCase.verificacionObtenerCart({customer_id: customer_id})
  }

  async crearCart(req: Request){
    const request: CreateCartRequest={
      product_id: req.body.product_id,
      quantity: req.body.quantity
    }
    console.log("request: ", request)
    const validation= Object.assign(new CreateCartRequest, request)
    console.log("post-validation: ", validation)
    const customer_id= (req as any).user.id
    return await this.useCase.verificacionCreacionCart({request_validado: validation, customer_id})
  }

  async modificar_quantity_cart_id(req: Request){
    const request: UpdateCartRequest={
      cart_id: Number(req.params.cart_id),
      quantity: req.body.quantity != null? Number(req.body.quantity): undefined
    }
    console.log("request: ", request)
    const validation= Object.assign(new UpdateCartRequest, request)
    console.log("post-validation: ", validation)
    return await this.useCase.verificacion_modificacion_quantity_cart_id({request_data: validation})
  }

  async borrar_cart_id(req: Request){
    const request: DeleteCartRequest={
      cart_id: Number(req.params.cart_id)
    }
    console.log("request: ", request)
    const validation= Object.assign(new DeleteCartRequest, request)
    console.log("validation: ", validation)
    return await this.useCase.verificacion_borrado_fisico_cart_id({request_data: validation})
  }
}