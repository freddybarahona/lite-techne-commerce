import dotenv from "dotenv"
dotenv.config()
export class env {
  //info de rabbitmq
  rabbitmq_url=Boolean(process.env.DOCKER)? String(process.env.RABBITMQ_URL_DOCKER) : String(process.env.RABBITMQ_URL)
}
