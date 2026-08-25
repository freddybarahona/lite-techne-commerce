import { Category } from "./category"

export class Product {
  product_id!: number

  name!: string

  description!: string

  price!: number

  is_active!: boolean

  category!: Category

  created_at!: Date

  deleted_at!: Date
}