import { InventoryDTO } from "../DTOs/inventory.DTO";
import { formResponse } from "../../../../shared/responses/formResponse";
import GenericResponse from "../../../../shared/responses/GenericResponse";
import { IInventoryRepository } from "./inventory.repository.interface";
import { CreateInventoryRequest } from "../requests/create.request";
import { ValidatorHelper } from "../../../../shared/helpers/validator.helper"
import { ResponseConstants } from "../../../../shared/constants/response.constants";
import { InventoryMapper } from "./inventory.mappers";
import { ObtenerMiembroPorIdRequest } from "../requests/obtener.inventario.id.Request";
import { ModificarStocksInventarioRequest } from "../requests/modificar.stocks.inventario.request";
import { SoftDeleteInventarioRequest } from "../requests/soft.delete.inventario.request";

export class InventoryUseCases{
  constructor(private readonly repository: IInventoryRepository){}

  async verificacionCreacionInventario({request_validado}:{request_validado: CreateInventoryRequest}): Promise<GenericResponse<InventoryDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: request_validado})
    console.log("errores: ", errors)
    const exists= await this.repository.ifExistsInventoryById({id:request_validado.product_id})
    console.log(exists)
    if(exists == true){
      errors.push(ResponseConstants.entityAlreadyExists({entity:"inventario" , id:request_validado.product_id }))
    }

    if(errors.length > 0){
      return formResponse.create({success: false, statusCode: 400, message: errors})
    }
    const actual_inventory= InventoryMapper.mapEnt({request: request_validado})

    const repo_result= await this.repository.createInventory({entity:actual_inventory})

    const DTO= InventoryMapper.mapDTO({entity: repo_result})

    return formResponse.create({ success: true, statusCode: 201, message: [ResponseConstants.entityCreatedCorrectly({entity:"inventario", creation_data: request_validado.product_id })], dataDTO: DTO })
  }


  async verificacion_obtencion_inventario_completo(): Promise<GenericResponse<InventoryDTO[]>>{
    const repo_result= await this.repository.getAllInventory()
    const response: InventoryDTO[]= []
    let actual_inventory
    for (const inventory of repo_result){
      actual_inventory=InventoryMapper.mapDTO({entity: inventory})
      response.push(actual_inventory)
    }
    if(repo_result.length == 0)
      return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.dbEmpty({ entity: "inventario"})], dataDTO: response})
    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.dbFull({cant: repo_result.length, entity: "inventario"})], dataDTO: response})
  }

  async verificacion_obtener_miembro_id_inventario({data}:{data: ObtenerMiembroPorIdRequest}): Promise<GenericResponse<InventoryDTO>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: data})
    console.log("errors: ", errors)
    const repo_result= await this.repository.getInventoryById({id: data.product_id})
    if(repo_result == null)
      errors.push(ResponseConstants.nothingLikeThatHere({entity:"inventario" , ind:data.product_id }))
    if(errors.length > 0)
      return formResponse.create({success: true, statusCode: 200, message: errors})
    const inventoryDTO= InventoryMapper.mapDTO({entity:repo_result!})
    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.somethingFoundHere({element:"no nombrado", ind:inventoryDTO.product_id, entity:"inventario"})], dataDTO: inventoryDTO})
  }

  async verificacion_modificar_stocks_inventario_id({inventory_data}:{inventory_data: ModificarStocksInventarioRequest}): Promise<GenericResponse<InventoryDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: inventory_data})
    console.log(errors)
    const exists= await this.repository.getInventoryById({id: inventory_data.product_id})
    if(exists == null){
      errors.push(ResponseConstants.nothingLikeThatHere({entity: "inventario",ind: inventory_data.product_id}))
    }
    if(errors.length > 0){
      return formResponse.create({success: false, statusCode: 400, message: errors})
    }
    
    inventory_data.stock== undefined? exists!.stock : exists!.stock= inventory_data.stock
    inventory_data.minimum_stock== undefined? exists!.minimum_stock : exists!.minimum_stock= inventory_data.minimum_stock 
    inventory_data.reserved_stock== undefined? exists!.reserved_stock : exists!.reserved_stock= inventory_data.reserved_stock!
    console.log(exists)

    const repo_result= await this.repository.modInventoryById({entity: exists!})
    const dataDTO= InventoryMapper.mapDTO({entity: repo_result})
    console.log(dataDTO)
    return formResponse.create({success: false, statusCode: 200, message: errors, dataDTO: dataDTO})
  }

  async verificacion_soft_Delete_inventario_id({request_data}:{request_data: SoftDeleteInventarioRequest}): Promise<GenericResponse<InventoryDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: request_data})
    console.log(errors)
    const exists= await this.repository.getInventoryById({id: request_data.product_id})

    if(exists == null)
      errors.push(ResponseConstants.nothingLikeThatHere({entity: "inventario",ind: request_data.product_id}))
    
    if(errors.length > 0)
      return formResponse.create({success: false, statusCode: 400, message: errors})
    
    const repo_result= await this.repository.deleteInventory({id: request_data.product_id})
    const inventoryDTO= InventoryMapper.mapDTO({entity: exists!})
    return formResponse.create({success: repo_result, statusCode: 200, message: [ResponseConstants.ERASED_ELEMENT], dataDTO: inventoryDTO})
  }
}