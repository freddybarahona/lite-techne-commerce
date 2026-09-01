import {validate} from "../../inventory/node_modules/class-validator"

export class ValidatorHelper{
  static async getErrors(params:{request: object}): Promise<string[]>{
    const validations = await validate(params.request)
    return validations.flatMap(error => Object.values(error.constraints ?? {}))
  }
}