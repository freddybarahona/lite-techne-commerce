import { Request } from "express";
import { CreateCategoryRequest } from "../../../application/model/requests/categories/CreateCategoryRequest";
import { CreateCategoryUseCase } from "../../../application/useCases/categories/CreateCategoryUseCase";


export class CreateCategoryController{
  constructor(private readonly useCase: CreateCategoryUseCase){}

  async crear(req: Request){
    const row= Object.assign(new CreateCategoryRequest(), this.mapRequest(req))
    const rsp= await this.useCase.verifica(row)
    return rsp
  }

  private mapRequest(data: Request): CreateCategoryRequest{
    return {
      category_id: Number(data.params.id),
      name: data.body.name,
      description: data.body.description
    }
  }
}
