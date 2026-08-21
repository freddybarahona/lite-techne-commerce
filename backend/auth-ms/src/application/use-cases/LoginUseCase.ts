import { Validator } from "class-validator";
import { formResponse } from "../../adapters/middlewares/FormResponse";
import { JwtService } from "../../adapters/middlewares/JwtService";
import { Role } from "../../domain/entities/roles";
import { UserRepository } from "../../infrastructure/config/database/UserRepository";
import { DateHelper } from "../../shared/helpers/DateHelper";
import { LoginRequest } from "../model/requests/LoginRequest";
import { GenericResponse } from "../responses/GenericResponse";
import bcrypt from "bcrypt"
import { ResponseConstants } from "../../shared/constants/ResponseConstants";
import { RoleRepository } from "../../infrastructure/config/database/RoleRepository";

export class loginUseCase{
  constructor(
    private readonly repository: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly jwt: JwtService
  ){}

  async verifica(data: LoginRequest): Promise<GenericResponse>{    
    let user = await this.repository.findByEmail(data.email)
    console.log(user)
    if(user == null) 
      return formResponse(false, 400, [ResponseConstants.USER_BAD_EMAIL_PASSWORD])  
    const validPassword=await bcrypt.compare(data.password, user.password_hash)
      
    if(!validPassword)
      return formResponse(false, 400, [ResponseConstants.USER_BAD_EMAIL_PASSWORD])  
    const token=this.jwt.generateToken(user!) 
    
    return formResponse(true, 200, [ResponseConstants.USER_LOGIN], token) 
  }
}