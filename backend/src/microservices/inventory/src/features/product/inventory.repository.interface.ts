import { Inventory } from "../../domain/entities/inventory";

export interface IInventoryRepository{
  createInventory(data: Inventory): Promise<Inventory>
  ifExistsInventoryById(data: number): Promise<Boolean>
  getAllInventory(): Promise<Inventory[]>
  getInventoryById(data: number): Promise<Inventory | null>
  modInventoryById(data: Inventory): Promise<Inventory>
  deleteInventory(data: number): Promise<Boolean>
}