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

  async verificacionCreacionInventario(params:{request: CreateInventoryRequest}): Promise<GenericResponse<InventoryDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: params.request})

    if(errors.length > 0){
      return formResponse.create({success: false, statusCode: 400, message: errors})
    }

    const inventory= InventoryMapper.mapEnt({request: params.request})

    const DTO= InventoryMapper.mapDTO({entity: inventory})

    return formResponse.create({ success: true, statusCode: 200, message: [ResponseConstants.entityCreatedCorrectly({entity:"inventario", creation_data: params.request.product_id })], dataDTO: DTO })
  }
}