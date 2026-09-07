import { IsInt, IsNotEmpty, IsString } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/response.constants"

export class ModifyCategoryByIdRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"category_id"})})
  @IsInt({message: ResponseConstants.onlyTypes({campo:"category_id", type:"numeros enteros"})})
  category_id!: number

  @IsString({message: ResponseConstants.onlyTypes({campo:"name", type:"texto"})})
  name!: string

  @IsString({message: ResponseConstants.onlyTypes({campo:"description", type:"texto"})})
  description!: string
}