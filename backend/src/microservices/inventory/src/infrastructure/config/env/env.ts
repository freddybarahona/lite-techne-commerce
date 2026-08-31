import dotenv from "dotenv"
import { Ienv } from "./env.interface"

dotenv.config() 
//esto tiene que ejecutarse primero para que las variables 
//de entorno no se pierdan en el traslado asi que mejor 
//dejalo asi

export class env implements Ienv{
  port!: number
  db_host!: string
  db_port!: number
  db_user!: string
  db_password!: string
  db_name!: string

  constructor(env=process.env){
    this.port= Number(env.PORT_BACK)
    this.db_host= String(env.)
  }
}