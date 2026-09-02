import express from "express"
import cors from "cors"
import InventoryRoutes from "../features/product/inventory.routes"
import { InventoryMakers } from "../factories/inventory.makers"
import { Environment } from "./config/env/env"

export default class AppCore{
  app= express()
  constructor(){
    this.config()
  }
  private config(){
    this.app.use(express.json()) 
    //express.json MAL | express.json() BIEN
    /* que te quede de experiencia este detalle
    no te lo marca el nodejs pero te lo marcara el postman quedandose
    colgado con cada request asi que necesitas figarte en esos detalles */
    
    console.log("ingreso a la configuracion")
    
    this.app.use(cors({origin: "*"}))
    const env= new Environment()
    const makers = new InventoryMakers(env)
    const inventoryRoutes= new InventoryRoutes(makers)
    //informacion de rutas de rutas
    this.app.use("/inventory", inventoryRoutes.create()) 
    //hay algo aqui que esta mal
    console.log("paso a las rutas")
  }
}