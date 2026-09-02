import { InventoryDTO } from "./DTOs/inventory.DTO";
import { formResponse } from "./formResponse";
import { GenericResponse } from "./GenericResponse";
import { IInventoryRepository } from "./inventory.repository.interface";
import { CreateInventoryRequest } from "./requests/create.request";
import { ValidatorHelper } from "../../../../shared/helpers/validator.helper"
import { ResponseConstants } from "../../../../shared/constants/response.constants";
import { InventoryMapper } from "./inventory.mappers";

export class InventoryUseCases{
  constructor(private readonly repository: IInventoryRepository){}

  async verificacionCreacionInventario({request}:{request: CreateInventoryRequest}): Promise<GenericResponse<InventoryDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: request})

    const exists= await this.repository.ifExistsInventoryById(request.product_id)
    console.log(exists)
    if(exists == true){
      errors.push(ResponseConstants.entityAlreadyExists({entity:"inventario" , id:request.product_id }))
    }

    if(errors.length > 0){
      return formResponse.create({success: false, statusCode: 400, message: errors})
    }


    const actual_inventory= InventoryMapper.mapEnt({request: request})

    const repo_result= await this.repository.createInventory(actual_inventory)

    const DTO= InventoryMapper.mapDTO({entity: repo_result})

    return formResponse.create({ success: true, statusCode: 200, message: [ResponseConstants.entityCreatedCorrectly({entity:"inventario", creation_data: request.product_id })], dataDTO: DTO })
  }
}