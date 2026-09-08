import { IsNotEmpty, IsString } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/response.constants"

export class LoginRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "email"})})
  @IsString({message: ResponseConstants.onlyTypes({campo: "email", type: "texto"})})
  email!: string

  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "password"})})
  @IsString({message: ResponseConstants.onlyTypes({campo: "password", type: "texto"})})
  password!: string
}