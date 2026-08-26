import { Category } from "../../domain/entities/category";
import { CategoryDTO } from "../model/DTOs/CategoryDTO";

export class CategoryMapper{
  static mapDTO(data: Category): CategoryDTO{
    return {
      category_id: data.category_id,
      name: data.name,
      description: data.description,
      product: data.product
    }
  }

  static mapEnt<T>(data: T): Category{
    const category = Object.assign(new Category(),data)

    return category
  } 
}