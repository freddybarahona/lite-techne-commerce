import { Inventory } from "../domain/entities/inventory";
import { InventoryControllers } from "../features/inventory/inventory.controller";
import { InventoryRepository } from "../features/inventory/inventory.repository";
import { InventoryUseCases } from "../features/inventory/inventory.use.cases";
import AppDataSource from "../infrastructure/config/database/data.source";
import { Environment } from "../core/config/env/env";

export class InventoryMakers{
  constructor(
    private readonly env: Environment,
  ){}
  private async refreshingSourceandRepo(){
    const source= new AppDataSource().create_get_instance()
    const inventoryRepo= source.getRepository(Inventory)
    return new InventoryRepository(inventoryRepo)
  }

  async instance(): Promise<InventoryControllers>{
    console.log("maker")
    const useCase = new InventoryUseCases(await this.refreshingSourceandRepo())
    console.log("maker2")
    return new InventoryControllers(useCase)
  }
}