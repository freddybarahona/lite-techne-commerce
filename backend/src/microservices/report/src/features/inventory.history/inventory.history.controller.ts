import { Request } from "express"
import { InventoryHistoryUseCases } from "./inventory.history.use.cases"
import { CreateInventoryHistoryRequest } from "../requests/create.inventory.history.request"

export class InventoryHistoryControllers{
  constructor(private readonly useCase: InventoryHistoryUseCases){}

  async registrarMovimiento(req: Request){
    const request: CreateInventoryHistoryRequest={
      productId: req.body.productId,
      movementType: req.body.movementType,
      quantity: req.body.quantity
    }
    const validation= Object.assign(new CreateInventoryHistoryRequest, request)
    return await this.useCase.registrarMovimiento({request_validado: validation})
  }

  async obtenerTodoElHistorial(){
    return await this.useCase.obtenerTodoElHistorial()
  }

  async obtenerHistorialPorProducto(req: Request){
    const productId= Number(req.params.productId)
    return await this.useCase.obtenerHistorialPorProducto({productId})
  }
}
