import { CatalogClient } from "../../domain/clients/catalog.client";
import { InventoryClient } from "../../domain/clients/inventory.client";
import { EventConsumer } from "../../../../shared/infrastructure/rabbitmq/event.consumer"

export class ReportConsumer{
  static async start(clients: {inventory: InventoryClient, catalog: CatalogClient}){
    await EventConsumer.subscribe({ 
      queue: "report.inventory", 
      routing_key: "inventory.#", 
      handler: (routingKey, data)=> clients.inventory.handleEvent(routingKey, data)}) 
    await EventConsumer.subscribe({ 
      queue: "report.catalog", 
      routing_key: "catalog.#", 
      handler: (routingKey, data)=> clients.inventory.handleEvent(routingKey, data)})
  }
}