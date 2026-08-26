import { formResponse } from "../../../adapters/middlewares/formResponses";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { GenericResponse } from "../../responses/genericResponse";

export class DeleteCategoryUseCase{
  constructor(private readonly repository: ICategoryRepository){}

  async verifica(data: number): Promise<GenericResponse>{
    const result= await this.repository.deleteCategory(data)
    console.log(result)

    return formResponse(true, 200, [ResponseConstants.ERASED_ELEMENT])
  }
}