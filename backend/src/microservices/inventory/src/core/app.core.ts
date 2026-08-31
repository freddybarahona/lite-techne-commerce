import express from "express"
import cors from "cors"

export class AppCore{
  public config= express()
  constructor(){
    this.appConfig()
  }
  async appConfig(){
    this.config.use(express.json)
    this.config.use(cors({origin: "*"}))
    this.routes()
    return await this.config
  }
  
  private routes(){
    //this.config.use("/inventory", InventoryRoutes)
  }
}