import { Request } from "express";
import { CreateProductRequest } from "../../../application/model/requests/products/CreateProductRequest";
import { CreateProductUseCase } from "../../../application/useCases/products/CreateProductUseCase";


export class CreateProductController{
  constructor(private readonly useCase: CreateProductUseCase){}

  async crear(req: Request){
    const row= Object.assign(new CreateProductRequest(), this.mapRequest(req))
    const rsp= await this.useCase.verifica(row)
    return rsp
  }

  private mapRequest(data: Request): CreateProductRequest{
    return {
      name: data.body.name,
      description: data.body.description,
      price: data.body.price,
      category_id: Number(data.body.cat_id)
    }
  }
}
