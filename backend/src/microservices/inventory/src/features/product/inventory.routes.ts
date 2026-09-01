import { Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export class InventoryRoutes{
  constructor(private readonly maker: InventoryMakers){}

  create(){
    const router= Router()

    router.post("", async(req, res)=>{
      const instance=await this.maker.createInventoryMaker()
      const rsp = await instance.crearInventario(req)
      console.log("ingreso a la ruta")
      res.status(rsp.statusCode).json(rsp)
    })

    return router
  }
}