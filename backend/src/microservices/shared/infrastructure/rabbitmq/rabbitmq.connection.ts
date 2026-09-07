import amqp from "amqplib"
import { env } from "../../env/env"

export class RabbitMQConnection{
  private static connection: amqp.ChannelModel | null = null
  private static channel: amqp.Channel | null  = null
  private static env= new env

  static async getChannel(): Promise<amqp.Channel>{
    if(this.channel) 
      return this.channel

    this.connection= await amqp.connect(this.env.rabbitmq_url)
    this.channel = await this.connection.createChannel() 
    return this.channel
  }
}