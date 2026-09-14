import { IInventoryHistoryRepository } from "../../features/inventory.history/inventory.history.repository.interface"
import { InventoryHistory } from "../entities/inventory.history"
import { MovementType } from "../../../../shared/types/shared.types"

export class InventoryClient{
  constructor(private readonly repository: IInventoryHistoryRepository){}

  private stocks = new Map<number, {
    product_id: number
    stock: number
    reserved_stock: number
    minimum_stock: number
  }>()

  async handleEvent(event: string, data: any){
    switch (event){
      case "inventory.created":
      case "inventory.updated": 
        this.stocks.set(Number(data.product_id), {
          product_id: Number(data.product_id),
          stock: Number(data.stock),
          reserved_stock: Number(data.reserved_stock ?? 0),
          minimum_stock: Number(data.minimum_stock ?? 0)
        })
        await this.persistMovement({product_id: Number(data.product_id), movementType: "IN", quantity: Number(data.stock)})
        console.log("entrada al cliente en memoria, updated/created")
        break
        case "inventory.deleted":
          const previo= this.stocks.get(Number(data.product_id))
          await this.persistMovement({product_id: Number(data.product_id), movementType: "OUT", quantity: previo?.stock ?? 0})
          this.stocks.delete(Number(data.product_id))
          console.log("entrada al cliente en memoria, delete")
          break
    }

  }
  //cuando un metodo asincrono no retorna nada no es necesario que tenga el await en el metodo que lo llama
  private async persistMovement({product_id, movementType, quantity}: {product_id: number, movementType: MovementType, quantity: number}){
    try{
      const entity= Object.assign(new InventoryHistory(), {productId: product_id, movementType, quantity})
      await this.repository.create({entity})
    }catch(error){
      console.error(`InventoryClient no pudo persistir el movimiento ${movementType} del producto ${product_id}:`, error)
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