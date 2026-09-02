import { Request } from "express"
import { CreateInventoryRequest } from "../requests/create.request"
import { InventoryUseCases } from "./inventory.use.cases"
import { ObtenerMiembroPorIdRequest } from "../requests/obtener.inventario.id.Request"

export class InventoryControllers{
  constructor(private readonly useCase: InventoryUseCases){}

  async crearInventario(req: Request){
    const fecha_actual= new Date()
    const request: CreateInventoryRequest={
      product_id: req.body.product_id,
      stock: req.body.stock,
      reserved_stock: req.body.reserved,
      minimum_stock: req.body.minimum,
      last_movement: fecha_actual
    } 
    const validation= Object.assign(new CreateInventoryRequest, request)
    return await this.useCase.verificacionCreacionInventario({request: request})
  }

  async obtener_inventario_completo(){
    return await this.useCase.verificacion_obtencion_inventario_completo()
  }

  async obtener_miembro_inventario(req: Request){
    const request: ObtenerMiembroPorIdRequest={
      product_id: req.body.product_id
    }
    const validation= Object.assign(new ObtenerMiembroPorIdRequest, request)
    return await this.useCase.verificacion_obtener_miembro_inventario({data: validation})
  }
}