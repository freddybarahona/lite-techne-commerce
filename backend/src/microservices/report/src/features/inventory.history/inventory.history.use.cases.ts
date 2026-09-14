import GenericResponse from "../../../../shared/responses/GenericResponse";
import { formResponse } from "../../../../shared/responses/formResponse";
import { IInventoryHistoryRepository } from "./inventory.history.repository.interface";
import { CreateInventoryHistoryRequest } from "../requests/create.inventory.history.request";
import { ValidatorHelper } from "../../../../shared/helpers/validator.helper";
import { ResponseConstants } from "../../../../shared/constants/response.constants";
import { InventoryHistoryMapper } from "./inventory.history.mappers";
import { InventoryHistory } from "../../domain/entities/inventory.history";

export class InventoryHistoryUseCases{
  constructor(private readonly repository: IInventoryHistoryRepository){}

  async registrarMovimiento({request_validado}:{request_validado: CreateInventoryHistoryRequest}): Promise<GenericResponse<InventoryHistory | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: request_validado})

    if(errors.length > 0){
      return formResponse.create({success: false, statusCode: 400, message: errors})
    }

    const entity= InventoryHistoryMapper.mapEnt({request: request_validado})
    const repo_result= await this.repository.create({entity})

    return formResponse.create({success: true, statusCode: 201, message: [ResponseConstants.entityCreatedCorrectly({entity: "movimiento de inventario", creation_data: repo_result.id})], dataDTO: repo_result})
  }

  async obtenerTodoElHistorial(): Promise<GenericResponse<InventoryHistory[]>>{
    const repo_result= await this.repository.getAll()
    if(repo_result.length == 0)
      return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.dbEmpty({entity: "historial de inventario"})], dataDTO: repo_result})
    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.dbFull({cant: repo_result.length, entity: "historial de inventario"})], dataDTO: repo_result})
  }

  async obtenerHistorialPorProducto({productId}:{productId: number}): Promise<GenericResponse<InventoryHistory[]>>{
    const repo_result= await this.repository.getByProductId({productId})
    if(repo_result.length == 0)
      return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.nothingLikeThatHere({entity: "historial de inventario", ind: productId})], dataDTO: repo_result})
    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.dbFull({cant: repo_result.length, entity: "historial de inventario"})], dataDTO: repo_result})
  }
}
