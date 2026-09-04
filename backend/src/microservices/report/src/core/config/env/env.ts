import dotenv from "dotenv"
import { IEnv } from "./env.interface"

dotenv.config() 

export class Environment implements IEnv{
  port= Number(process.env.PORT)
  db_host= String(process.env.DB_HOST)
  db_port= Number(process.env.DB_PORT)
  db_user= String(process.env.DB_USER)
  db_password= String(process.env.DB_PASSWORD)
  db_name=String(process.env.DB_NAME)
}