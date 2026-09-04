import express from "express"
import { Environment } from "./config/env/env"
import cors from "cors"

export default class AppCore{
  app= express()
  constructor(){
    this.config()
  }

  private config(){
    this.app.use(express.json())

    this.app.use(cors({origin: "*"}))
    const env= new Environment()
    //this.app.use("/report", )
  }
}