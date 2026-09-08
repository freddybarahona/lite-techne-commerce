import dotenv from "dotenv"
dotenv.config()
export class env {
  //info de rabbitmq
  rabbitmq_url=String(process.env.RABBITMQ_URL)


}