import { IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength } from "class-validator"
import { ResponseConstants } from "../../../shared/constants/ResponseConstants"

export class CreateCategoryRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace("id")})
  @IsInt({message: ResponseConstants.onlyTypes("id", "enteros")}) 
  category_id!: number

  @IsNotEmpty({message: ResponseConstants.requiredSpace("name")})
  @IsString({message: ResponseConstants.onlyTypes("name", "texto" )})
  @MaxLength(50,{message:(args) => ResponseConstants.maxLength("name", args.constraints[0])})
  name!: string
  
  @IsNotEmpty({message: ResponseConstants.requiredSpace("description")})
  @IsString({message: ResponseConstants.onlyTypes("description", "texto")})
  @MaxLength(100,{message:(args) => ResponseConstants.maxLength("description", args.constraints[0])})
  description!: string
}