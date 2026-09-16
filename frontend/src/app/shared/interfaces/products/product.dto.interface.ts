export interface ProductDTO {
  product_id: number
  name: string
  description: string
  price: number
  is_active: boolean
  category: Category
}

interface Category{
  category_id: number
}
