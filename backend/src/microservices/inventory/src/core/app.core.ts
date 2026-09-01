import express from "express"
import cors from "cors"
import { InventoryRoutes } from "../features/product/inventory.routes"

export class AppCore{
  static appConfig(){
    const config= express()
    config.use(express.json)
    console.log("ingreso a la configuracion")
    config.use(cors({origin: "*"}))
    const inventoryRoutes= new InventoryRoutes()
    //informacion de rutas de rutas
    config.use("/inventory", inventoryRoutes.create()) //hay algo aqui que esta mal
    console.log("paso a las rutas")
    return config
  }
}