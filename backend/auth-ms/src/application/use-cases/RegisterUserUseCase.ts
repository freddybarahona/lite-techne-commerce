import { formResponse } from "../../adapters/middlewares/FormResponse";
import { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ResponseConstants } from "../../shared/constants/ResponseConstants";
import { RegisterUserRequest } from "../model/requests/RegisterUserRequest";
import { GenericResponse } from "../responses/GenericResponse";

export class RegisterUserUseCase{
  constructor(
    private readonly repository: IUserRepository,
    private readonly roleRepo: IRoleRepository
  ){}

  async verifica(data: RegisterUserRequest): Promise<GenericResponse>{
    const error: string[]=[] 
    data.is_active= true
    const roleUser= await this.roleRepo.findRoleById(data.role)
    if(roleUser == null)  
      error.push(ResponseConstants.USER_ROLE_INVALID)

    if(error.length > 0)
      return formResponse(false, 400, error)

    data.role=roleUser!
    console.log(data)
    const user= await this.repository.createUser(data)
    console.log(user)
    return formResponse(true, 201, [ResponseConstants.USER_CREATED_YES], user)
  }
}