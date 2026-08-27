import { formResponse } from "../../../adapters/middlewares/formResponses";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { ValidatorHelper } from "../../../shared/helpers/validatorHelper";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ModifyProductByIdRequest } from "../../model/requests/products/ModifyProductByIdRequest";
import { GenericResponse } from "../../responses/genericResponse";

export class ModifyProductByIdUseCase{
  constructor(
    private readonly repository: IProductRepository,
    private readonly catRepo: ICategoryRepository
  ){}

  async verifica(data: ModifyProductByIdRequest): Promise<GenericResponse>{
    const errors: string[] = await ValidatorHelper.getErrors(data)

    const exists= await this.repository.getProductById(data.product_id)
    if(exists == null)
      errors.push(ResponseConstants.nothingLikeThatHere("products", data.product_id))

    const category = await this.catRepo.getCategoryById(data.category_id)
    if(category == null)
      errors.push(ResponseConstants.nothingLikeThatHere("category", data.category_id))

    if(errors.length > 0)
      return formResponse(false, 400, errors)

    data.name.length == 0 ? data.name= exists!.name: data.description.length == 0 ? data.description= exists!.description : data.price == null ? data.price = exists!.price : data.category_id == null? exists!.category.category_id : data.is_active == null ? data.is_active= exists!.is_active : data.is_active = data.is_active 
    console.log(data)
    
    const entity= ProductMapper.mapEnt(data)
    console.log(entity)
    entity.category=category!
    
    await this.repository.modProductById(entity)

    const prodDTO=ProductMapper.mapDTO(entity)
    return formResponse(true, 200, [ResponseConstants.modifiedCorrectlyHere(entity.name, entity.product_id, "product")], prodDTO)
  }
}