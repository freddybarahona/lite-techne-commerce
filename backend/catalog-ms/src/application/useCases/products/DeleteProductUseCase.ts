import { formResponse } from "../../../adapters/middlewares/formResponses";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { GenericResponse } from "../../responses/genericResponse";

export class DeleteProductUseCase{
  constructor(private readonly repository: IProductRepository){}

  async verifica(data: number): Promise<GenericResponse>{
    const result= await this.repository.deleteProduct(data)

    return formResponse(true, 200, [ResponseConstants.ERASED_ELEMENT])
  }
}