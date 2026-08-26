import { GetCategoriesUseCase } from "../../../application/useCases/categories/GetCategoriesUseCase";

export class GetCategoriesController{
  constructor(private readonly useCase: GetCategoriesUseCase){}

  async obtener(){
    const rsp= await this.useCase.verifica()
    return rsp
  }
}