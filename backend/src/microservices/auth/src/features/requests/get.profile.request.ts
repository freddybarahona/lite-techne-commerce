import { IsNotEmpty, IsString } from "class-validator"
import { ResponseConstants } from "../../../../shared/constants/response.constants"

export class GetProfileRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo: "email"})})
  @IsString({message: ResponseConstants.onlyTypes({campo: "email", type: "texto"})})
  email!: string
}