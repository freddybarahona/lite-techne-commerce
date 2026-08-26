import { Product } from "../../domain/entities/product"
import { ProductDTO } from "../model/DTOs/ProductDTO"
import { CategoryMapper } from "./CategoryMapper"

export class ProductMapper{
  static mapDTO(data: Product): ProductDTO{
    return {
      product_id: data.product_id,
      name: data.name,
      description: data.description,
      price: data.price,
      is_active: data.is_active,
      category: data.category
    }
  }

  static mapEnt<T>(data: T): Product{
    const product = Object.assign(new Product(),data)

    return product
  } 
}