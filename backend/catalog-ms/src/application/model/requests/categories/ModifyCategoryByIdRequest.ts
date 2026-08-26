import { IsAlpha, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/ResponseConstants"


export class ModifyCategoryByIdRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace(("id"))})
  @IsNumber({allowInfinity: false}, {message: ResponseConstants.onlyTypes("id", "numeros")})
  category_id!: number

  @IsString({message: ResponseConstants.onlyTypes("name", "texto")})
  name!: string

  @IsString({message: ResponseConstants.onlyTypes("description", "texto")})
  description!: string
}