import { Inventory } from "../../domain/entities/inventory";

export interface IInventoryRepository{
  createInventory({entity}:{entity: Inventory}): Promise<Inventory>
  ifExistsInventoryById({id}:{id: number}): Promise<Boolean>
  getAllInventory(): Promise<Inventory[]>
  getInventoryById({id}:{id: number}): Promise<Inventory | null>
  modInventoryById({entity}:{entity: Inventory}): Promise<Inventory>
  deleteInventory({id}:{id: number}): Promise<boolean>
}