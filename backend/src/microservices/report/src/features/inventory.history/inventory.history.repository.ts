import { Repository } from "typeorm";
import { InventoryHistory } from "../../domain/entities/inventory.history";
import { IInventoryHistoryRepository } from "./inventory.history.repository.interface";
import AppDataSource from "../../infrastructure/database/data.source";

export class InventoryHistoryRepository implements IInventoryHistoryRepository{
  constructor(
    private repository: Repository<InventoryHistory>,
  ){}

  async create({entity}:{entity: InventoryHistory}): Promise<InventoryHistory>{
    const result= this.repository.create(entity)
    return await this.repository.save(result)
  }

  async getAll(): Promise<InventoryHistory[]> {
    return await this.repository.find()
  }

  async getByProductId({productId}:{productId: number}): Promise<InventoryHistory[]> {
    return await this.repository.findBy({productId})
  }
}
