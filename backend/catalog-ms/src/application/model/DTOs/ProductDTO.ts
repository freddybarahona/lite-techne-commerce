import { Category } from "../../../domain/entities/category"

export class ProductDTO{
  product_id!: number
  name!: string
  description!: string
  price!: number
  is_active!: boolean
  category!: Category
}