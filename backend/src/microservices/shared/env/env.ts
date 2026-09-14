import dotenv from "dotenv"
<<<<<<< HEAD
dotenv.config()
export class env {
  //info de rabbitmq
  rabbitmq_url=String(process.env.RABBITMQ_URL)


}
=======

export class env {
  //info de rabbitmq
  rabbitmq_url=Boolean(process.env.DOCKER)? String(process.env.RABBITMQ_URL_DOCKER) : String(process.env.RABBITMQ_URL)
}
>>>>>>> feature/catalog-ms
