import { Request } from "express";
import { ModifyCategoryByIdUseCase } from "../../../application/useCases/categories/ModifyCategoryByIdUseCase";
import { ModifyCategoryByIdRequest } from "../../../application/model/requests/categories/ModifyCategoryByIdRequest";

export class ModifyCategoryByIdController{
  constructor(private readonly useCase: ModifyCategoryByIdUseCase){}

  async modifica(req: Request){
    const row = Object.assign(new ModifyCategoryByIdRequest, this.mapRequest(req))
    const rsp = await this.useCase.verifica(row)
    return rsp
  }
  private mapRequest(req:Request): ModifyCategoryByIdRequest{
    return {
      category_id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description
    }
  }
}