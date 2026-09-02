import { GenericResponse } from "./GenericResponse"
import { DateHelper } from "../helpers/date.helper"
export class formResponse{
  static create<DTO>(params:{
    success: boolean
    statusCode: number
    message: string[]
    dataDTO?: DTO
  }):GenericResponse<DTO>{
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