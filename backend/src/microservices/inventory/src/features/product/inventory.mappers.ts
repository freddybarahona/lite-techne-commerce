import { Inventory } from "../../domain/entities/inventory"
import { InventoryDTO } from "./DTOs/inventory.DTO"


export class InventoryMapper{
   static mapDTO(params:{entity: Inventory}): InventoryDTO{
    return {
      product_id: params.entity.product_id,
      stock: params.entity.stock,
      reserved_stock: params.entity.reserved_stock,
      minimum_stock: params.entity.minimum_stock,
      last_movement: params.entity.last_movement
    }
  }

  static mapEnt<T>(params:{request: T}): Inventory{
    const product = Object.assign(new Inventory(), params.request)
    console.log(product)
    return product
  } 
}