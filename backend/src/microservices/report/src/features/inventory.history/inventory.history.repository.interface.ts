import { InventoryHistory } from "../../domain/entities/inventory.history";

export interface IInventoryHistoryRepository{
  create({entity}:{entity: InventoryHistory}): Promise<InventoryHistory>
  getAll(): Promise<InventoryHistory[]>
  getByProductId({productId}:{productId: number}): Promise<InventoryHistory[]>
}
