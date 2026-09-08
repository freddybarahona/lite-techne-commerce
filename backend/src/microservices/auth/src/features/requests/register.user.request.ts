import { IsInt, IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/response.constants"

export class RegisterUserRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "first_name"})})
  @IsString({message: ResponseConstants.onlyTypes({campo: "first_name", type: "texto"})})
  first_name!: string

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "last_name"})})
  @IsString({message: ResponseConstants.onlyTypes({campo: "last_name", type: "texto"})})
  last_name!: string

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "email"})})
  @IsEmail({}, {message: ResponseConstants.USER_EMAIL_INVALID})
  email!: string

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "password"})})
  @IsString({message: ResponseConstants.onlyTypes({campo: "password", type: "texto"})})
  @MinLength(3, {message: (args) => ResponseConstants.maxLength({data: "password", max: args.constraints[0]})})
  password!: string

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "role"})})
  @IsInt({message: ResponseConstants.onlyTypes({campo: "role", type: "numero"})})
  role!: number
}