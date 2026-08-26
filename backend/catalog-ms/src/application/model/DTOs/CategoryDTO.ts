import { Product } from "../../../domain/entities/product"

export class CategoryDTO{
  category_id!: number
  name!: string
  description!: string
  product!:Product[]
}