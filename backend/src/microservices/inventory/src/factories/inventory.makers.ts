import { Inventory } from "../domain/entities/inventory";
import { InventoryControllers } from "../features/product/inventory.controller";
import { InventoryRepository } from "../features/product/inventory.repository";
import { InventoryUseCases } from "../features/product/inventory.use.cases";
import AppDataSource from "../infrastructure/config/database/data.source";
import { Environment } from "../infrastructure/config/env/env";

export class InventoryMakers{
  constructor(
    private readonly env: Environment,
  ){}
  private async refreshingSourceandRepo(){
    const source= new AppDataSource().dataSource
    const inventoryRepo= source.getRepository(Inventory)
    return new InventoryRepository(inventoryRepo, this.env)
  }

  async createInventoryMaker(): Promise<InventoryControllers>{
    console.log("maker")
    const useCase = new InventoryUseCases(await this.refreshingSourceandRepo())
    console.log("maker2")
    return new InventoryControllers(useCase)
  }
}