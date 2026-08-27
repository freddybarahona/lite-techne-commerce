import { IsAlpha, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/ResponseConstants"


export class ModifyProductByIdRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace("name")})
  @IsInt({message: ResponseConstants.onlyTypes("price", "numeros enteros")})
  product_id!: number

  @IsString({message: ResponseConstants.onlyTypes("name", "texto" )})
  @MaxLength(50,{message:(args) => ResponseConstants.maxLength("name", args.constraints[0])})
  name!: string
  
  @IsString({message: ResponseConstants.onlyTypes("description", "texto")})
  @MaxLength(100,{message:(args) => ResponseConstants.maxLength("description", args.constraints[0])})
  description!: string

  @IsNumber({}, {message: ResponseConstants.onlyTypes("price", "numeros")})
  price!: number
  @IsBoolean({message: ResponseConstants.onlyTypes("is_active", "booleanos")})
  is_active!: boolean

  @IsInt({message: ResponseConstants.onlyTypes("price", "numeros enteros")})
  category_id!: number
}