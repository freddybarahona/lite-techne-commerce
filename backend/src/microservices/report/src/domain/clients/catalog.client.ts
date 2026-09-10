import { IInventoryHistoryRepository } from "../../features/inventory.history/inventory.history.repository.interface"

export class CatalogClient{
  constructor(private readonly repository: IInventoryHistoryRepository){}

  private products = new Map<number, {
    product_id: number
    name: string
    price: number
    category: string
  }>()

  async handleEvent(event: string, data: any){
    switch (event){
      case "catalog.product.created":
      case "catalog.product.updated": 
        this.products.set(Number(data.product_id), {
          product_id: Number(data.product_id),
          name: String(data.name),
          price: Number(data.price),
          category: String(data.category)
        })
        break
      case "catalog.product.deleted":
        this.products.delete(Number(data.product_id))
        break
    }

  }

  getAll(){
    return [...this.products.values()]
  }

  getByProductId(id: number){
    return this.products.get(id)
  }
}