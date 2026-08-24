import { formResponse } from "../../adapters/middlewares/FormResponse";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ResponseConstants } from "../../shared/constants/ResponseConstants";
import { GetProfileRequest } from "../model/requests/GetProfileRequest";
import { GenericResponse } from "../responses/GenericResponse";

export class GetProfileUseCase{
  constructor(private readonly repository: IUserRepository){}
  
  async verifica(data: GetProfileRequest): Promise<GenericResponse>{

    const rsp = await this.repository.findByEmail(data.email)
    console.log(rsp)
    if(rsp == null)
      return formResponse(false, 400, [ResponseConstants.USER_FOUND_NOT], rsp)
    
    return formResponse(true, 200, [ResponseConstants.USER_FOUND_YES], rsp)
  }
}