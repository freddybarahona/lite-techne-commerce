import dotenv from "dotenv"
import { IEnv } from "./env.interface"

dotenv.config() 

export class Environment implements IEnv{
  //datos de backend
  port= Number(process.env.PORT)

  //datos de base de datos
  db_host= Boolean(process.env.DOCKER)? String(process.env.DB_HOST_DOCKER) : String(process.env.DB_HOST)
  db_port= Number(process.env.DB_PORT)
  db_user= String(process.env.DB_USER)
  db_password= String(process.env.DB_PASSWORD)
  db_name=String(process.env.DB_NAME)
  synchronize= process.env.SYNCHRONIZE === "true" ? true : false
  logging= process.env.LOGGING === "true" ? true : false
}