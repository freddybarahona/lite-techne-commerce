import { Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export default class InventoryRoutes{
  router= Router()

  constructor(private readonly maker: InventoryMakers){}

  instanciar(){
    this.router.post("", async(req, res)=>{
      const instance=await this.maker.instance()
      const rsp = await instance.crearInventario(req)
      res.status(rsp.statusCode).json(rsp)
    })

    this.router.get("/get", async(req, res)=>{
      const instance=await this.maker.instance()
      const rsp = await instance.obtener_inventario_completo()
      res.status(rsp.statusCode).json(rsp)
    })

    return this.router
  }
}