import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator"
import { Role } from "../../../domain/entities/roles"
import { ResponseConstants } from "../../../shared/constants/ResponseConstants"

export class RegisterUserRequest{
  @IsString({message: ResponseConstants.userDataIsString("nombre")})
  @IsNotEmpty({message: ResponseConstants.userRequiredData("nombre")})
  first_name!: string
  
  @IsString({message: ResponseConstants.userDataIsString("apellido")})
  @IsNotEmpty({message: ResponseConstants.userRequiredData("apellido")})
  last_name!: string
  
  @IsEmail({}, {message: ResponseConstants.USER_EMAIL_INVALID} )
  email!: string

  @IsString({message: ResponseConstants.userDataIsString("password")})
  @IsNotEmpty({message: ResponseConstants.userRequiredData("password")})
  @MinLength(3, {message: (args) => ResponseConstants.userMinLength(args.constraints[0])}) //args == argumentos
  password!: string
  
  @IsInt({message: ResponseConstants.userDataIsInt("rol")})
  @IsNotEmpty({message: ResponseConstants.userRequiredData("rol")})
  role!: number 
  //el is_active 
  //default:true
}