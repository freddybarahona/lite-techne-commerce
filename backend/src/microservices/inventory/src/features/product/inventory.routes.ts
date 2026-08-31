import { Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export class InventoryRoutes{
  private router= Router()
  constructor(private readonly maker: InventoryMakers){}


  async createInventory(){
    this.router.post("", async(req, res)=>{
      const instance=await this.maker.createInventoryMaker()
      const rsp = await instance.crearInventario(req)
      res.status(rsp.statusCode).json(rsp)
    })
  }

}