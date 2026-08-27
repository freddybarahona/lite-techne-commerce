import { formResponse } from "../../../adapters/middlewares/formResponses";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { ResponseConstants } from "../../../shared/constants/ResponseConstants";
import { ProductMapper } from "../../mappers/ProductMapper";
import { GenericResponse } from "../../responses/genericResponse";

export class GetProductByIdUseCase{
  constructor(private readonly repository: IProductRepository){}
  async verifica(row: number): Promise<GenericResponse>{
    const product= await this.repository.getProductById(row)
    if(product == null)
      return formResponse(true, 200, [ResponseConstants.nothingLikeThatHere("products", row)])
    
    const productDTO = ProductMapper.mapDTO(product!)
    return formResponse(true, 200, [ResponseConstants.somethingFoundHere(productDTO.name,productDTO.product_id,"products")], productDTO)
  }
}