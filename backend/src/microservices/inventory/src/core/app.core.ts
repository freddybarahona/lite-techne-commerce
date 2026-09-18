import express from "express"
import cors from "cors"
import InventoryRoutes from "../features/inventory/inventory.routes"
import CartRoutes from "../features/cart/cart.routes"
import { InventoryMakers } from "../factories/inventory.makers"
import { CartMakers } from "../factories/cart.makers"
import { Environment } from "./config/env/env"
import { Auth } from "./../../../shared/infrastructure/middlewares/auth.jwt"

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
    const auth= new Auth(env.jwt_secret)
    const makers = new InventoryMakers(env)
    const inventoryRoutes= new InventoryRoutes(makers, auth)
    this.app.use("/inventory", inventoryRoutes.registrar_ruta())

    const cartMakers = new CartMakers(env)
    const cartRoutes = new CartRoutes(cartMakers, auth)
    this.app.use("/cart", cartRoutes.registrar_ruta())
  }
}