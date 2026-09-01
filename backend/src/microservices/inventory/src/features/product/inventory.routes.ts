import { Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export default class InventoryRoutes{
  router= Router()

  constructor(private readonly maker: InventoryMakers){}

  create(){
    this.router.post("", async(req, res)=>{
      const instance=await this.maker.createInventoryMaker()
      const rsp = await instance.crearInventario(req)
      console.log("ingreso a la ruta")
      res.status(rsp.statusCode).json(rsp)
    })


    return this.router
  }
}