import { Request } from "express";
import { GetProfileUseCase } from "../../application/use-cases/GetProfileUseCase";

export class GetProfileController{
  constructor(private readonly useCase : GetProfileUseCase){}

  async ver(req: Request){
    const nombre= String(req.body.nombre)
    const rsp= await this.useCase.verifica(nombre)
    return rsp
  }
  
}