import { GetProductsUseCase } from "../../../application/useCases/products/GetProductsUseCase";

export class GetProductsController{
  constructor(private readonly useCase: GetProductsUseCase){}

  async obtener(){
    const rsp= await this.useCase.verifica()
    return rsp
  }
}