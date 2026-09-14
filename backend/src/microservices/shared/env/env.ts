import dotenv from "dotenv"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
dotenv.config()
export class env {
  //info de rabbitmq
  rabbitmq_url=String(process.env.RABBITMQ_URL)


}
=======
=======
>>>>>>> feature/inventory-ms
=======
>>>>>>> feature/report-ms

export class env {
  //info de rabbitmq
  rabbitmq_url=Boolean(process.env.DOCKER)? String(process.env.RABBITMQ_URL_DOCKER) : String(process.env.RABBITMQ_URL)
}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> feature/catalog-ms
=======
>>>>>>> feature/inventory-ms
=======
>>>>>>> feature/report-ms
