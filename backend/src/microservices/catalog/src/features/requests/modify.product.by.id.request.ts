import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/response.constants"

export class ModifyProductByIdRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"product_id"})})
  @IsInt({message: ResponseConstants.onlyTypes({campo:"product_id", type:"numeros enteros"})})
  product_id!: number

  @IsString({message: ResponseConstants.onlyTypes({campo:"name", type:"texto"})})
  @MaxLength(50,{message:(args) => ResponseConstants.maxLength({data:"name", max: args.constraints[0]})})
  name!: string

  @IsString({message: ResponseConstants.onlyTypes({campo:"description", type:"texto"})})
  @MaxLength(100,{message:(args) => ResponseConstants.maxLength({data:"description", max: args.constraints[0]})})
  description!: string

  @IsNumber({}, {message: ResponseConstants.onlyTypes({campo:"price", type:"numeros"})})
  price!: number

  @IsBoolean({message: ResponseConstants.onlyTypes({campo:"is_active", type:"booleanos"})})
  is_active!: boolean

  @IsInt({message: ResponseConstants.onlyTypes({campo:"category_id", type:"numeros enteros"})})
  category_id!: number
}