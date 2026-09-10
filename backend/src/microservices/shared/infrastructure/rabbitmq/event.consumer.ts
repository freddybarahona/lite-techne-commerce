import { InitializeConstants } from "../../constants/initialize.constants"
import { RabbitMQConnection } from "./rabbitmq.connection"

const EXCHANGE= "litetechne"

export class EventConsumer{
  static async subscribe({queue, routing_key, handler}:{queue: string, routing_key: string, handler: (routingKey: string, data: any) => Promise<void> | void}){
      const channel= await RabbitMQConnection.getChannel()
  
      await channel.assertExchange(EXCHANGE, "topic", {durable: true})
      await channel.assertQueue(queue, {durable: true})
      await channel.bindQueue(queue, EXCHANGE, routing_key)
      channel.consume(queue, async(msg)=>{
        if(!msg) return

        try{
          const payload = JSON.parse(msg.content.toString())
          await handler(msg.fields.routingKey, payload.data)
          channel.ack(msg)
        }catch(error){
          console.error(`[consumer ${queue}] error:`, error)
          channel.nack(msg, false, true)
        }

      })

  }
}