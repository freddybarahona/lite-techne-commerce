import dotenv from "dotenv"

dotenv.config() 
//esto tiene que ejecutarse primero para que las variables 
//de entorno no se pierdan en el traslado asi que mejor 
//dejalo asi

export const env ={
  port: Number(process.env.PORT),

  //info de la BD 
  db_host: String(process.env.DB_HOST),
  db_port: Number(process.env.DB_PORT),
  db_user: String(process.env.DB_USER),
  db_password: String(process.env.DB_PASSWORD),
  db_name: String(process.env.DB_NAME)
}