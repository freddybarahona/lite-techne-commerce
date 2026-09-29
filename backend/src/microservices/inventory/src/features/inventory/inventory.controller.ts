import { Request } from "express"
import { CreateInventoryRequest } from "../requests/create.request"
import { InventoryUseCases } from "./inventory.use.cases"
import { ObtenerMiembroPorIdRequest } from "../requests/obtener.inventario.id.Request"
import { ModificarStocksInventarioRequest } from "../requests/modificar.stocks.inventario.request"
import { SoftDeleteInventarioRequest } from "../requests/soft.delete.inventario.request"

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
    console.log("request: ", request)
    const validation= Object.assign(new CreateInventoryRequest, request)
    console.log("post-validation: ", validation)
    return await this.useCase.verificacionCreacionInventario({request_validado: validation})
  }

  async obtener_inventario_completo(){
    return await this.useCase.verificacion_obtencion_inventario_completo()
  }

  async obtener_miembro_id_inventario(req: Request){
    const request: ObtenerMiembroPorIdRequest={
      product_id: Number(req.params.product_id)
    }
    console.log("request: ", request)
    const validation= Object.assign(new ObtenerMiembroPorIdRequest, request)
    console.log("validation: ", validation)
    return await this.useCase.verificacion_obtener_miembro_id_inventario({data: validation})
  }

  async modificar_stocks_inventario_id({req}:{req: Request}){
    const fecha_actual: Date= new Date()

    const request: ModificarStocksInventarioRequest={
      product_id: Number(req.params.product_id),
      stock: req.body.stock != null? Number(req.body.stock): undefined,
      reserved_stock: req.body.reserved != null? Number(req.body.reserved): undefined,
      minimum_stock: req.body.minimum != null? Number(req.body.minimum) : undefined,
      last_movement: fecha_actual
    }
    const validation= Object.assign(new ModificarStocksInventarioRequest, request)
    const rsp= await this.useCase.verificacion_modificar_stocks_inventario_id({inventory_data: validation})
    return rsp
  }

  async soft_delete_inventario_id(req: Request){
    const request: SoftDeleteInventarioRequest={
      product_id: Number(req.params.product_id)
    }

    const validation= Object.assign(new SoftDeleteInventarioRequest, request)
    const rsp= this.useCase.verificacion_soft_Delete_inventario_id({request_data: validation})
    return rsp
  }

}