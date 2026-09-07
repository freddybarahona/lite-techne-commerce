import express from "express"
import { Environment } from "./config/env/env"
import cors from "cors"
import InventoryHistoryRoutes from "../features/inventory.history/inventory.history.routes"
import { InventoryHistoryMakers } from "../factories/inventory.history.makers"

export default class AppCore{
  app= express()
  constructor(){
    this.config()
  }

  private config(){
    this.app.use(express.json())

    this.app.use(cors({origin: "*"}))
    const env= new Environment()
    const makers= new InventoryHistoryMakers(env)
    const inventoryHistoryRoutes= new InventoryHistoryRoutes(makers)
    this.app.use("/report/inventory-history", inventoryHistoryRoutes.registrar_ruta())
  }
}