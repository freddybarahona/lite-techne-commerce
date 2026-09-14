import { InventoryHistory } from "../domain/entities/inventory.history";
import { InventoryHistoryControllers } from "../features/inventory.history/inventory.history.controller";
import { InventoryHistoryRepository } from "../features/inventory.history/inventory.history.repository";
import { InventoryHistoryUseCases } from "../features/inventory.history/inventory.history.use.cases";
import AppDataSource from "../infrastructure/database/data.source";
import { Environment } from "../core/config/env/env";

export class InventoryHistoryMakers{
  constructor(
    private readonly env: Environment,
  ){}

  private async refreshingSourceandRepo(){
    const source= new AppDataSource().instance_validator()
    const inventoryHistoryRepo= source.getRepository(InventoryHistory)
    return new InventoryHistoryRepository(inventoryHistoryRepo)
  }

  async instance(): Promise<InventoryHistoryControllers>{
    const useCase= new InventoryHistoryUseCases(await this.refreshingSourceandRepo())
    return new InventoryHistoryControllers(useCase)
  }
}
