import { ResponseConstants } from "../../../../shared/constants/response.constants"
import { formResponse } from "../../../../shared/responses/formResponse"
import GenericResponse from "../../../../shared/responses/GenericResponse"
import { UserDTO } from "../DTOs/user.DTO"
import { LoginRequest } from "../requests/login.request"
import { RegisterUserRequest } from "../requests/register.user.request"
import { GetProfileRequest } from "../requests/get.profile.request"
import { UserMapper } from "./auth.mappers"
import { IUserRepository, IRoleRepository } from "./auth.repository.interface"
import { JwtService } from "../../infrastructure/middlewares/jwt.service"
import bcrypt from "bcrypt"

export class AuthUseCases{
  constructor(
    private readonly repository: IUserRepository,
    private readonly roleRepo: IRoleRepository,
    private readonly jwt: JwtService
  ){}

  async login({request_validado}:{request_validado: LoginRequest}): Promise<GenericResponse<string>>{
    const user= await this.repository.findByEmail({email: request_validado.email})
    if(user == null){
      return formResponse.create({success: false, statusCode: 400, message: [ResponseConstants.USER_BAD_EMAIL_PASSWORD]})
    }

    const validPassword= await bcrypt.compare(request_validado.password, user.password_hash)
    if(!validPassword){
      return formResponse.create({success: false, statusCode: 400, message: [ResponseConstants.USER_BAD_EMAIL_PASSWORD]})
    }

    const token= this.jwt.generateToken(user!)
    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.USER_LOGIN], dataDTO: token})
  }

  async register({request_validado}:{request_validado: RegisterUserRequest}): Promise<GenericResponse<UserDTO>>{
    const roleUser= await this.roleRepo.findRoleById({id: request_validado.role})
    if(roleUser == null){
      return formResponse.create({success: false, statusCode: 400, message: [ResponseConstants.USER_ROLE_INVALID]})
    }

    const existsEmail= await this.repository.ifExistsEmail({email: request_validado.email})
    if(existsEmail){
      return formResponse.create({success: false, statusCode: 400, message: [ResponseConstants.USER_EMAIL_EXISTS]})
    }

    const userEntity= await UserMapper.mapEnt({request: request_validado, role: roleUser})
    const user= await this.repository.createUser({entity: userEntity})
    const dto= UserMapper.mapEntityToDTO({entity: user})
    return formResponse.create({success: true, statusCode: 201, message: [ResponseConstants.USER_CREATED_YES], dataDTO: dto})
  }

  async getProfile({request_validado}:{request_validado: GetProfileRequest}): Promise<GenericResponse<UserDTO>>{
    const result= await this.repository.findByEmail({email: request_validado.email})
    if(result == null){
      return formResponse.create({success: false, statusCode: 400, message: [ResponseConstants.USER_FOUND_NOT]})
    }

    const dto= UserMapper.mapEntityToDTO({entity: result})
    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.USER_FOUND_YES], dataDTO: dto})
  }
}