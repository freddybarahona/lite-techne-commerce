import { IInventoryRepository } from "./inventory.repository.interface";
import { CreateInventoryRequest } from "./requests/create.request";

export class InventoryUseCases{
  constructor(private readonly repository: IInventoryRepository){}

  async verficacionCreacionInventario(data: CreateInventoryRequest){

  }
}