import { RabbitMQConnection } from "./rabbitmq.connection"
import { DateHelper } from "./../../helpers/date.helper"
import { publishType } from "./../../types/shared.types"

export class EventPublisher {
  static async publish({routingKey, data}:{routingKey: publishType, data: object}){
    const channel =await  RabbitMQConnection.getChannel()
    
    await channel.assertExchange("litetechne", "topic", {durable: true})

    channel.publish("litetechne", routingKey, Buffer.from(JSON.stringify({
      event: routingKey,
      timestamp: DateHelper.now(),
      data
    })))
  }
}