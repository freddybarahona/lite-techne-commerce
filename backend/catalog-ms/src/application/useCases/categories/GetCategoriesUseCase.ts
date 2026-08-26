import { formResponse } from "../../../adapters/middlewares/formResponses";
import { Category } from "../../../domain/entities/category";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { CategoryDTO } from "../../model/DTOs/CategoryDTO";
import { GenericResponse } from "../../responses/genericResponse";

export class GetCategoriesUseCase{
  constructor(private readonly repository: ICategoryRepository){}
  async verifica(): Promise<GenericResponse>{
    const category= await this.repository.getAllCategories()
    if(category.length == 0)
      formResponse(true, 200, [ResponseConstants.dbEmpty("categories")])
    const catDTO : CategoryDTO[] = []
    for(let i=0; i<category.length; i++){
      const actualCategory = CategoryMapper.mapDTO(category[i])
      catDTO.push(actualCategory)
    }
    return formResponse(true, 200, [ResponseConstants.dbFull("categories", category.length)], catDTO)
  }
}