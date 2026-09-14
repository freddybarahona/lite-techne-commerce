import { Request } from "express";
import { GetProfileUseCase } from "../../application/use-cases/GetProfileUseCase";
import { GetProfileRequest } from "../../application/model/requests/GetProfileRequest";

export class GetProfileController{
  constructor(private readonly useCase : GetProfileUseCase){}

  async ver(req: Request){
    const row: GetProfileRequest={
      email: (req as any).user.email
    }
    const rsp= await this.useCase.verifica(row)
    return rsp
  }
  
}