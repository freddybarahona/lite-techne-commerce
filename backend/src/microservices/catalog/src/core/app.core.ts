import express from "express"
import cors from "cors"
import { Environment } from "./config/env/env"
import { ProductMakers } from "../factories/product.makers"
import { CategoryMakers } from "../factories/category.makers"
import { ProductRoutes } from "../features/product/product.routes"
import { CategoryRoutes } from "../features/category/category.routes"

export default class AppCore{
  app= express()
  constructor(){
    this.config()
  }
  private config(){
    this.app.use(express.json())
    this.app.use(cors({origin: "*"}))

    const env= new Environment()
    const productRoutes= new ProductRoutes(new ProductMakers(env))
    const categoryRoutes= new CategoryRoutes(new CategoryMakers(env))

    this.app.use("/products", productRoutes.registrar_ruta())
    this.app.use("/categories", categoryRoutes.registrar_ruta())
  }
}