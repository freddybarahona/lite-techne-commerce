import { serverconfigurations } from "../core/config/config";
import { Inventory } from "../domain/entities/inventory";
import { InventoryRepository } from "../features/product/inventory.repository";
import { MyConnectionOptions } from "../features/product/inventory.types";
import { AppDataSource } from "../infrastructure/config/database/data.source";
import { Environment } from "../infrastructure/config/env/env";

export class InventoryMakers{
  constructor(
    private readonly connect: MyConnectionOptions,
    private readonly env: Environment
  ){}
  private async refreshingSourceandRepo(){
    const source=(await AppDataSource.dataSource(this.connect, this.env)).getRepository(Inventory)
    return new InventoryRepository(source, this.connect, this.env)
  }

  async createInventoryMaker(): Promise<Inventory>{
    const useCase = new CreateInventoryUseCase(this.refreshingSourceandRepo)
    return new CreateInventoryController(useCase)
  }
}