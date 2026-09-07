import { RabbitMQConnection } from "./rabbitmq.connection";

export class EventPublisher {
  static async publish(routingKey: string, data: object){
    const channel =await  RabbitMQConnection.getChannel()
    
    await channel.assertExchange("litetechne", "topic", {durable: true})

    channel.publish("litetechne", routingKey, Buffer.from(JSON.stringify({
      event: routingKey,
      timestamp: new Date().toISOString(),
      data
    })))
  }
}