import { Repository } from "typeorm";
import { Inventory } from "../../domain/entities/inventory";
import { IInventoryRepository } from "./inventory.repository.interface";
import AppDataSource from "../../infrastructure/config/database/data.source";

export class InventoryRepository implements IInventoryRepository{
  constructor(
    private repository: Repository<Inventory>,
  ){}

  async createInventory({entity}:{entity: Inventory}): Promise<Inventory> {
    const result= this.repository.create(entity)
    return this.repository.save(result)
  }

  async ifExistsInventoryById({id}:{id: number}): Promise<Boolean> {
    return await this.repository.existsBy({inventory_id: id})? true : false
  }

  async getAllInventory(): Promise<Inventory[]> {
    return await this.repository.find()
  }

  async getInventoryById({id}:{id: number}): Promise<Inventory | null> {
    return await this.repository.findOneBy({product_id: id})
  }
  
  async modInventoryById({entity}:{entity: Inventory}): Promise<Inventory>{
    return await this.repository.save(entity)
  }
  async deleteInventory({id}:{id: number}): Promise<boolean> {
    return await this.repository.softDelete(id) ? true : false 
  }
}