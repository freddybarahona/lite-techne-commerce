import { Repository } from "typeorm";
import { Inventory } from "../../domain/entities/inventory";
import { IInventoryRepository } from "./inventory.repository.interface";
import AppDataSource from "../../infrastructure/config/database/data.source";

export class InventoryRepository implements IInventoryRepository{
  constructor(
    private repository: Repository<Inventory>,
  ){
    const dataSource= new AppDataSource().dataSource
    this.repository= dataSource.getRepository(Inventory)
  }

  async createInventory(data: Inventory): Promise<Inventory> {
    const result= this.repository.create(data)
    return this.repository.save(result)
  }

  async ifExistsInventoryById(data: number): Promise<Boolean> {
    return await this.repository.existsBy({inventory_id: data}) 
  }

  async getAllInventory(): Promise<Inventory[]> {
    return await this.repository.find()
  }

  async getInventoryById(data: number): Promise<Inventory | null> {
    return await this.repository.findOneBy({product_id: data})
  }
  
  async modInventoryById(data: Inventory): Promise<Inventory> {
    return await this.repository.save(data)
  }
  async deleteInventory(data: number): Promise<Boolean> {
    return await this.repository.softDelete(data) ? true : false 
  }
}