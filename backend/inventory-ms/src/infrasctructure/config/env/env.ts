import dotenv from "dotenv"

dotenv.config() 
//esto tiene que ejecutarse primero para que las variables 
//de entorno no se pierdan en el traslado asi que mejor 
//dejalo asi

export const env ={
  port: Number(process.env.PORT)
}