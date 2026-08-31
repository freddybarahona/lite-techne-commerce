import { serverconfigurations } from "../core/config/config";
import { AppDataSource } from "../infrastructure/config/database/data.source";

export class InventoryMakers{
  dataSource!: AppDataSource
  inventoryRepo!: InventoryRepository(dataSource)
  async createInventoryMaker(): Promise<>{
    const useCase = new CreateInventoryUseCase(this.inventoryRepo)
    return new CreateInventoryController(useCase)
  }
}