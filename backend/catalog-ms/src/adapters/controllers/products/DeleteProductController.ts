import { Request } from "express";
import { DeleteCategoryUseCase } from "../../../application/useCases/categories/DeleteCategoryUseCase";
import { DeleteProductUseCase } from "../../../application/useCases/products/DeleteProductUseCase";

export class DeleteProductController{
  constructor(private readonly useCase: DeleteProductUseCase){}

  async borra(req: Request){
    const row = Number(req.params.id)

    return await this.useCase.verifica(row)
  }
}