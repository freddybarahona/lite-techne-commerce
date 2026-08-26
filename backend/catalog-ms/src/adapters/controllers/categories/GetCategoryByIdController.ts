import { Request } from "express";
import { GetCategoriesUseCase } from "../../../application/useCases/categories/GetCategoriesUseCase";
import { GetCategoryByIdUseCase } from "../../../application/useCases/categories/GetCategoryByIdUseCase";

export class GetCategoryByIdController{
  constructor(private readonly useCase: GetCategoryByIdUseCase){}

  async obtener(req: Request){
    const row= Number(req.params.id)
    const rsp= await this.useCase.verifica(row)
    return rsp
  }
}