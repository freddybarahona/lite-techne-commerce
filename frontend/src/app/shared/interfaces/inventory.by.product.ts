export interface InventoryByProduct {
  product_id: number
  name: string
  description: string
  category: string
  price: number
  is_active: boolean
  stock: number
  reserved_stock: number
  available: number
}
