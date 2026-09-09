import amqp from "amqplib"
import { env } from "../../env/env"
import { InitializeConstants } from "../../constants/initialize.constants"

export class RabbitMQConnection{
  private static connection: amqp.ChannelModel | null = null
  private static channel: amqp.Channel | null  = null
  private static env= new env

  static async getChannel(): Promise<amqp.Channel>{
    if(this.channel) 
      return this.channel

    this.connection= await amqp.connect(this.env.rabbitmq_url || "amqp://localhost")
    this.channel = await this.connection.createChannel() 

    if(this.channel){
      console.log(InitializeConstants.toolConnectionEstablished({tool: "rabbitmq"}))
    }
    return this.channel
  }
}

/* 
Sin fallback: amqp.connect(this.env.rabbitmq_url) → agregar || "amqp://localhost"
El fallback importa porque si RABBITMQ_URL no se carga, String(undefined) = "undefined" → URL 
inválida y nadie te manda eventos. Report-ms es un puerto sin eventos = dashboard vacío.
*/