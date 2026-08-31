import { serverconfigurations } from "../core/config/config";
import { Inventory } from "../domain/entities/inventory";
import { InventoryControllers } from "../features/product/inventory.controller";
import { InventoryRepository } from "../features/product/inventory.repository";
import { MyConnectionOptions } from "../features/product/inventory.types";
import { InventoryUseCases } from "../features/product/inventory.uses";
import { AppDataSource } from "../infrastructure/config/database/data.source";
import { Environment } from "../infrastructure/config/env/env";

export class InventoryMakers{
  constructor(
    private readonly connect: MyConnectionOptions,
    private readonly env: Environment,
  ){}
  private async refreshingSourceandRepo(){
    const source=await AppDataSource.dataSource(this.connect, this.env)
    const inventoryRepo= source.getRepository(Inventory)
    return new InventoryRepository(inventoryRepo, this.connect, this.env)
  }

  async createInventoryMaker(): Promise<InventoryControllers>{
    const useCase = new InventoryUseCases(await this.refreshingSourceandRepo())
    return new InventoryControllers(useCase)
  }
}