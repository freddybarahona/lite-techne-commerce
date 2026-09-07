export class InventoryClient{
  private stocks = new Map<number, {
    product_id: number
    stock: number
    reserved_stock: number
    minimum_stock: number
  }>()

  handleEvent(event: string, data: any): void{
    switch (event){
      case "inventory.created":
      case "inventory.updated": 
        this.stocks.set(Number(data.product_id), {
          product_id: Number(data.product_id),
          stock: Number(data.stock),
          reserved_stock: Number(data.reserved_stock ?? 0),
          minimum_stock: Number(data.minimum_stock ?? 0)
        })
        break
      case "inventory.deleted":
        this.stocks.delete(Number(data.product_id))
        break
    }

  }

  getAll(){
    return [...this.stocks.values()]
  }

  getProductId(id: number){
    return this.stocks.get(id)
  }

  getLowStock(){
    return this.getAll().filter(i => i.stock <= i.minimum_stock)
  }
}