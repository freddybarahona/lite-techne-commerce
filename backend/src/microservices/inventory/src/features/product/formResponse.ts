import { GenericResponse } from "./GenericResponse"

export class formResponse{
  static Response<data>(params:{
    success: boolean
    statusCode: number
    message: string[]
    data: data
  }):GenericResponse<>{
    return {
      success: params.success,
      statusCode: params.statusCode,
      message: params.success? message[0] : "",
      data: params.data,
      errors: params.success? []: params.message, 
      timestamp: DateHelper.now()
    }
  }
}