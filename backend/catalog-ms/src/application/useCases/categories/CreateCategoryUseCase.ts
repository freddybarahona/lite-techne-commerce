import { formResponse } from "../../../adapters/middlewares/formResponses";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { ValidatorHelper } from "../../../shared/helpers/validatorHelper";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { CreateCategoryRequest } from "../../model/requests/CreateCategoryRequest";
import { GenericResponse } from "../../responses/genericResponse";

export class CreateCategoryUseCase{
  constructor(private readonly repository: ICategoryRepository){}

  async verifica(data: CreateCategoryRequest): Promise<GenericResponse>{
    const errors: string[]=await  ValidatorHelper.getErrors(data)

    const exists = await this.repository.ifExistsCategoryByName(data.name)
    if(exists)
      errors.push(ResponseConstants.CATEGORY_ALREADY_EXISTS)
    if(errors.length > 0)
      return formResponse(false, 400, errors)

    const category= await this.repository.createCategory(CategoryMapper.mapEnt(data))


    return formResponse(true, 201, [ResponseConstants.categoryCreatedCorrectly(data.name)], CategoryMapper.mapDTO(category))

  }
}