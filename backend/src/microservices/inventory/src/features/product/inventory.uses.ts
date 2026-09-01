import { formResponse } from "./formResponse";
import { GenericResponse } from "./GenericResponse";
import { IInventoryRepository } from "./inventory.repository.interface";
import { CreateInventoryRequest } from "./requests/create.request";

export class InventoryUseCases{
  constructor(private readonly repository: IInventoryRepository){}

  async verficacionCreacionInventario(data: CreateInventoryRequest): Promise<GenericResponse<CreateInventoryRequest>>{
    return formResponse.create({ success: true, statusCode: 200, message: ["entrada exitosa"], dataDTO: data })
  }
}