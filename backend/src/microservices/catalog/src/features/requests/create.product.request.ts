import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/response.constants"

export class CreateProductRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"name"})})
  @IsString({message: ResponseConstants.onlyTypes({campo:"name", type:"texto"})})
  @MaxLength(50,{message:(args) => ResponseConstants.maxLength({data:"name", max: args.constraints[0]})})
  name!: string

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"description"})})
  @IsString({message: ResponseConstants.onlyTypes({campo:"description", type:"texto"})})
  @MaxLength(100,{message:(args) => ResponseConstants.maxLength({data:"description", max: args.constraints[0]})})
  description!: string

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"price"})})
  @IsNumber({}, {message: ResponseConstants.onlyTypes({campo:"price", type:"numeros"})})
  price!: number

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"category_id"})})
  @IsInt({message: ResponseConstants.onlyTypes({campo:"category_id", type:"numeros enteros"})})
  category_id!: number
}