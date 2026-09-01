import { Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export class InventoryRoutes{
  static maker: InventoryMakers



  create(){
    const router= Router()
    this.createInventory({router: router})

    return router
  }

  private createInventory(params:{router: Router}){
    params.router.post("", async(req, res)=>{
      const instance=await InventoryRoutes.maker.createInventoryMaker()
      const rsp = await instance.crearInventario(req)
      console.log("ingreso a la ruta")
      res.status(rsp.statusCode).json(rsp)
    })
  }

}