import { Request } from "express";
import { GetProductByIdUseCase } from "../../../application/useCases/products/GetProductByIdUseCase";

export class GetProductByIdController{
  constructor(private readonly useCase: GetProductByIdUseCase){}

  async obtener(req: Request){
    const row= Number(req.params.id)
    const rsp= await this.useCase.verifica(row)
    return rsp
  }
}