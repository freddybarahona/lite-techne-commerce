import { GenericResponse } from "../../application/responses/GenericResponse";
import { DateHelper } from "../../shared/helpers/DateHelper";

export const formResponse = (
  success: boolean,
  statusCode: number,
  message: string[] = [],
  data?: any
): GenericResponse => {
  return {
    success: success,
    statusCode: statusCode,
    message: success? message[0] : "",
    data: data,
    errors: success? []: message, 
    timestamp: DateHelper.now()
  }
}