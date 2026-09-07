import { Product } from "../../domain/entities/product";
import { ProductDTO } from "../DTOs/product.DTO";

export class ProductMapper{

  EntityToDTO({entity}:{entity: Product}): ProductDTO{
    const dto= new ProductDTO()
    dto.product_id= entity.product_id
    dto.name= entity.name
    dto.description= entity.description
    dto.price= entity.price
    dto.is_active= entity.is_active
    dto.category= entity.category
    return dto
  }

  EntityListToDTOList({entityList}:{entityList: Product[]}): ProductDTO[]{
    const dtoList: ProductDTO[]= []
    entityList.forEach((entity)=>{
      dtoList.push(this.EntityToDTO({entity: entity}))
    })
    return dtoList
  }
}