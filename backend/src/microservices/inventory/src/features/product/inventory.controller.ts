import { Request } from "express"
import { InventoryUseCases } from "./inventory.uses"
import { CreateInventoryRequest } from "./requests/create.request"

export class InventoryControllers{
  constructor(private readonly useCase: InventoryUseCases){}

  async crearInventario(req: Request){
    const sender: CreateInventoryRequest={
      product_id: req.body.product_id,
      stock: req.body.stock,
      reserved_stock: req.body.reserved,
      minimum_stock: req.body.minimum,
      last_movement: req.body.date
    } 
    const request= Object.assign(new CreateInventoryRequest, sender)
    return await this.useCase.verificacionCreacionInventario({request: request})
  }
}