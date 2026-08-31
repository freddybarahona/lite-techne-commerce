import { Request } from "express"
import { InventoryUseCases } from "./inventory.uses"
import { CreateInventoryRequest } from "./requests/create.request"

export class InventoryControllers{
  constructor(private readonly useCase: InventoryUseCases){}

  async crearInventario(req: Request){
    const row= Object.assign(new CreateInventoryRequest, {})
    return await this.useCase.verficacionCreacionInventario(row)
  }
}