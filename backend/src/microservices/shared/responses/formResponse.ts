<<<<<<< HEAD:backend/src/microservices/inventory/src/features/product/formResponse.ts
import { GenericResponse } from "./GenericResponse"
import { DateHelper } from "../../../../shared/helpers/date.helper"
export class formResponse{
  static create<dto>(params:{
    success: boolean
    statusCode: number
    message: string[]
    dataDTO: dto
  }):GenericResponse<dto>{
=======
import GenericResponse from "./GenericResponse"
import { DateHelper } from "../helpers/date.helper"
export class formResponse{
  static create<DTO>(params:{
    success: boolean
    statusCode: number
    message: string[]
    dataDTO?: DTO
  }):GenericResponse<DTO>{
>>>>>>> 2b75e9d746210f35b77213ac4763eb51f5277c43:backend/src/microservices/shared/responses/formResponse.ts
    return {
      success: params.success,
      statusCode: params.statusCode,
      message: params.success? params.message[0] : "",
      data: params.dataDTO,
      errors: params.success? []: params.message, 
      timestamp: DateHelper.now()
    }
  }
}