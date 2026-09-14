import { Category } from "../../domain/entities/category";
import { CategoryDTO } from "../DTOs/category.DTO";

export class CategoryMapper{

  EntityToDTO({entity}:{entity: Category}): CategoryDTO{
    const dto= new CategoryDTO()
    dto.category_id= entity.category_id
    dto.name= entity.name
    dto.description= entity.description
    dto.product= entity.product
    return dto
  }

  EntityListToDTOList({entityList}:{entityList: Category[]}): CategoryDTO[]{
    const dtoList: CategoryDTO[]= []
    entityList.forEach((entity)=>{
      dtoList.push(this.EntityToDTO({entity: entity}))
    })
    return dtoList
  }
}