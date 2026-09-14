import { DateHelper } from "../../helpers/date.helper";
import { publishType } from "../../types/shared.types";
import { RabbitMQConnection } from "./rabbitmq.connection";

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