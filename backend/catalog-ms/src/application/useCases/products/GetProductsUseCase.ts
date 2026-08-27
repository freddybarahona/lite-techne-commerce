import { formResponse } from "../../../adapters/middlewares/formResponses";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductDTO } from "../../model/DTOs/ProductDTO";
import { GenericResponse } from "../../responses/genericResponse";

export class GetProductsUseCase{
  constructor(private readonly repository: IProductRepository){}
  async verifica(): Promise<GenericResponse>{
    const products= await this.repository.getAllProducts()
    if(products.length == 0)
      formResponse(true, 200, [ResponseConstants.dbEmpty("products")])
    const prodDTO : ProductDTO[] = []
    
    for(let i=0; i<products.length; i++){
      const actualProduct = ProductMapper.mapDTO(products[i])
      prodDTO.push(actualProduct)
    }
  
    return formResponse(true, 200, [ResponseConstants.dbFull("products", products.length)], prodDTO)
  }
}