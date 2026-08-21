import { GenericResponse } from "../../application/responses/GenericResponse";
import { DateHelper } from "../../shared/helpers/DateHelper";

export const formResponse = (
  type: boolean,
  statusCode: number,
  message: string[] = [],
  data?: any
): GenericResponse => {
  return {
    type: type,
    statusCode: statusCode,
    message: message? message[0] : "",
    data: data,
    errors: type? []: message, 
    timestamp: DateHelper.now()
  }
}