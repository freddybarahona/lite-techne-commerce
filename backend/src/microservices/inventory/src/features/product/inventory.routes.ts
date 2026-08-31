import { Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export class InventoryRoutes{
  private router= Router()
  private maker!: InventoryMakers
  async createInventory(controller= this.maker.createInventoryMaker()){
    this.router.post("", async(req, res)=>{
      const rsp = await controller.crear(req)
      res.status(rsp.statusCode).json(rsp)
    })
  }

}