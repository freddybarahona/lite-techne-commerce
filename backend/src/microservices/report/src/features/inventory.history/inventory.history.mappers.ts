import { InventoryHistory } from "../../domain/entities/inventory.history"

export class InventoryHistoryMapper{
  static mapEnt<T>(params:{request: T}): InventoryHistory{
    return Object.assign(new InventoryHistory(), params.request)
  }
}
