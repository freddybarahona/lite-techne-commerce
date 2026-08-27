import { Request } from "express";
import { ModifyProductByIdRequest } from "../../../application/model/requests/products/ModifyProductByIdRequest";
import { ModifyProductByIdUseCase } from "../../../application/useCases/products/ModifyProductByIdUseCase";

export class ModifyProductByIdController{
  constructor(private readonly useCase: ModifyProductByIdUseCase){}

  async modifica(req: Request){
    const row = Object.assign(new ModifyProductByIdRequest, this.mapRequest(req))
    const rsp = await this.useCase.verifica(row)
    return rsp
  }

  private mapRequest(req:Request): ModifyProductByIdRequest{
    return {
      product_id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      is_active: req.body.active,
      category_id: req.body.cat_id 
    }
  }
}