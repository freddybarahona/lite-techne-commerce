import { formResponse } from "../../adapters/middlewares/FormResponse";
import { User } from "../../domain/entities/users";
import { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ResponseConstants } from "../../shared/constants/ResponseConstants";
import { RegisterUserRequest } from "../model/requests/RegisterUserRequest";
import { GenericResponse } from "../responses/GenericResponse";
import { ValidatorHelper } from "../../shared/helpers/ValidatorHelper";
import bcrypt from "bcrypt"
import { Role } from "../../domain/entities/roles";
import { UserMapper } from "../mappers/user/userMapper";

export class RegisterUserUseCase{
  constructor(
    private readonly repository: IUserRepository,
    private readonly roleRepo: IRoleRepository
  ){}

  async verifica(data: RegisterUserRequest): Promise<GenericResponse>{
    console.log(data)
    const errors: string[]= await ValidatorHelper.getErrors(data) 

    const roleUser= await this.roleRepo.findRoleById(data.role)
    if(roleUser == null)  
      errors.push(ResponseConstants.USER_ROLE_INVALID)

    const existsEmail= await this.repository.IfExistsEmail(data.email)
    if(existsEmail){
      errors.push(ResponseConstants.USER_EMAIL_EXISTS)
    }
    
    if(errors.length > 0){
      return formResponse(false, 400, errors)
    }

    const userEntity = await UserMapper.mapEnt(data, roleUser!)

    const user= await this.repository.createUser(userEntity)
    console.log(userEntity)
    return formResponse(true, 201, [ResponseConstants.USER_CREATED_YES], UserMapper.mapDTO(user))
  }
}