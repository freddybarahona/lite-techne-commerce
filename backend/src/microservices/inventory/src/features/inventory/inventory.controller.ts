import { Request } from "express"
import { CreateInventoryRequest } from "../requests/create.request"
import { InventoryUseCases } from "./inventory.use.cases"

export class InventoryControllers{
  constructor(private readonly useCase: InventoryUseCases){}

  async crearInventario(req: Request){
    const fecha_actual= new Date()
    const sender: CreateInventoryRequest={
      product_id: req.body.product_id,
      stock: req.body.stock,
      reserved_stock: req.body.reserved,
      minimum_stock: req.body.minimum,
      last_movement: fecha_actual
    } 
    const request= Object.assign(new CreateInventoryRequest, sender)
    return await this.useCase.verificacionCreacionInventario({request: request})
  }

  async obtener_inventario_completo(){
    return await this.useCase.verificacion_obtencion_inventario_completo()
  }
}