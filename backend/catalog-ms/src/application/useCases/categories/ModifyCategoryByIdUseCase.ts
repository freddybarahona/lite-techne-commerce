import { formResponse } from "../../../adapters/middlewares/formResponses";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { ValidatorHelper } from "../../../shared/helpers/validatorHelper";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { ModifyCategoryByIdRequest } from "../../model/requests/categories/ModifyCategoryByIdRequest";
import { GenericResponse } from "../../responses/genericResponse";

export class ModifyCategoryByIdUseCase{
  constructor(private readonly repository: ICategoryRepository){}

  async verifica(data: ModifyCategoryByIdRequest): Promise<GenericResponse>{
    const errors: string[] = await ValidatorHelper.getErrors(data)

    const exists= await this.repository.getCategoryById(data.category_id)
    if(exists == null)
      errors.push(ResponseConstants.nothingLikeThatHere("categories", data.category_id))

    if(errors.length > 0)
      return formResponse(false, 400, errors)

    data.name.length == 0 ? data.name= exists!.name: data.description.length == 0 ? data.description= exists!.description : data.description= data.description
    const entity= CategoryMapper.mapEnt(data)
    await this.repository.modCategoryById(entity)

    const catDTO=CategoryMapper.mapDTO(entity)
    return formResponse(true, 200, [ResponseConstants.modifiedCorrectlyHere(entity.name, entity.category_id, "category")], catDTO)
  }
}