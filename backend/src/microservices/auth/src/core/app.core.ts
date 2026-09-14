import express from "express"
import cors from "cors"
import { Environment } from "./config/env/env"
import { AuthMakers } from "../factories/auth.makers"
import { AuthRoutes } from "../features/auth/auth.routes"

export default class AppCore{
  app= express()
  constructor(){
    this.config()
  }
  private config(){
    this.app.use(express.json())
    this.app.use(cors({origin: "*"}))

    const env= new Environment()
    const authRoutes= new AuthRoutes(new AuthMakers(env), env)

    this.app.use("/auth", authRoutes.registrar_ruta())
    console.log("config")
  }
}