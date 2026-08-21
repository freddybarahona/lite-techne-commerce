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

export class loginUseCase{
  constructor(
    private readonly repository: UserRepository,
    private readonly jwt: JwtService
  ){}

  async verifica(data: LoginRequest): Promise<GenericResponse>{
    let validPassword, token
    
    const user = await this.repository.findByEmail(data.email)
    user? validPassword=await bcrypt.compare(data.password, user.password_hash)
      : formResponse(false, 404, [ResponseConstants.USER_NOT_FOUND]) 
    validPassword? token=this.jwt.generateToken(user!) 
      : formResponse(false, 400, [ResponseConstants.USER_BAD_PASSWORD]) 
    
    return formResponse(true, 200, [ResponseConstants.USER_LOGIN]) 
  }
}