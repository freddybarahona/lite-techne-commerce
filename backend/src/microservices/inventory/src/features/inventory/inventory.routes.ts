import { Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export default class InventoryRoutes{
  router= Router()

  constructor(private readonly maker: InventoryMakers){}

  crear_inventario(){
    this.router.post("", async(req, res)=>{
      const instance=await this.maker.instance()
      const rsp = await instance.crearInventario(req)
      console.log("ingreso a la ruta")
      res.status(rsp.statusCode).json(rsp)
    })


    return this.router
  }

  obtener_inventario_general(){
    this.router.get("", async(req, res)=>{
      const instance=await this.maker.instance()
      const rsp = await instance.obtener_inventario_completo()
      console.log("ingreso a la ruta")
      res.status(rsp.statusCode).json(rsp)
    })
  }
}