import { formResponse } from "../../../adapters/middlewares/formResponses";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { CategoryDTO } from "../../model/DTOs/CategoryDTO";
import { GenericResponse } from "../../responses/genericResponse";

export class GetCategoryByIdUseCase{
  constructor(private readonly repository: ICategoryRepository){}
  async verifica(row: number): Promise<GenericResponse>{
    const category= await this.repository.getCategoryById(row)
    if(category == null)
      return formResponse(true, 200, [ResponseConstants.nothingLikeThatHere("categories", row)])
    
    const categoryDTO = CategoryMapper.mapDTO(category!)
    return formResponse(true, 200, [ResponseConstants.somethingFoundHere(categoryDTO.name,categoryDTO.category_id,"categories")], categoryDTO)
  }
}