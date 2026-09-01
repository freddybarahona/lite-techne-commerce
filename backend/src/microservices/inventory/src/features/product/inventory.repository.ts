import { Repository } from "typeorm";
import { Inventory } from "../../domain/entities/inventory";
import { IInventoryRepository } from "./inventory.repository.interface";
import AppDataSource from "../../infrastructure/config/database/data.source";
import { MyConnectionOptions } from "./inventory.types";
import { Environment } from "../../infrastructure/config/env/env";

export class InventoryRepository implements IInventoryRepository{
  constructor(
    private repository: Repository<Inventory>,
    private readonly env: Environment
  ){}
  private async infoRepo(){
    const dataSource= new AppDataSource().create()
    this.repository= dataSource.getRepository(Inventory)
  }

  createInventory(data: Inventory): Promise<Inventory> {
    throw new Error("Method not implemented.");
  }
  ifExistsInventoryByName(data: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  getAllInventory(): Promise<Inventory[]> {
    throw new Error("Method not implemented.");
  }
  getInventoryById(data: number): Promise<Inventory | null> {
    throw new Error("Method not implemented.");
  }
  modInventoryById(data: Inventory): Promise<Inventory> {
    throw new Error("Method not implemented.");
  }
  deleteInventory(data: number): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
}