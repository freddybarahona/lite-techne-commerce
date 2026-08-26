import { Request } from "express";
import { DeleteCategoryUseCase } from "../../../application/useCases/categories/DeleteCategoryUseCase";

export class DeleteCategoryController{
  constructor(private readonly useCase: DeleteCategoryUseCase){}

  async borra(req: Request){
    const row = Number(req.params.id)

    return await this.useCase.verifica(row)
  }
}