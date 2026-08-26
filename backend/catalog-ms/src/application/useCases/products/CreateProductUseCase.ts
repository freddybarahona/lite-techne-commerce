import { formResponse } from "../../../adapters/middlewares/formResponses";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { ValidatorHelper } from "../../../shared/helpers/validatorHelper";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { ProductMapper } from "../../mappers/ProductMapper";
import { CreateCategoryRequest } from "../../model/requests/categories/CreateCategoryRequest";
import { CreateProductRequest } from "../../model/requests/products/CreateProductRequest";
import { GenericResponse } from "../../responses/genericResponse";

export class CreateProductUseCase{
  constructor(
    private readonly repository: IProductRepository,
    private readonly catRepo: ICategoryRepository
  ){}

  async verifica(data: CreateProductRequest): Promise<GenericResponse>{
    const errors: string[]=await  ValidatorHelper.getErrors(data)
    const category = await this.catRepo.getCategoryById(data.category_id)
    if(category == null){
      errors.push(ResponseConstants.nothingLikeThatHere("category", data.category_id))
    }
    if(errors.length > 0)
      return formResponse(false, 400, errors)
    const prodBase= ProductMapper.mapEnt(data)
    prodBase.is_active= true
    prodBase.category= category!
    console.log(prodBase)
    const product= await this.repository.createProduct(prodBase)
    

    return formResponse(true, 201, [ResponseConstants.productCreatedCorrectly(data.name)], ProductMapper.mapDTO(product))

  }
}