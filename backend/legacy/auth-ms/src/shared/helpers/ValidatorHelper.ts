import { validate } from "class-validator";

export class ValidatorHelper{
  static async getErrors(request: object): Promise<string[]>{
    const validations = await validate(request)
    return validations.flatMap(error => Object.values(error.constraints ?? {}))
    // flatMap: convierte varios arreglos de errores en un único arreglo
  }
}