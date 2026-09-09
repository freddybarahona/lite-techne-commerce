import AppCore from "../app.core";
import { Environment } from "./env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import AppDataSource from "../../infrastructure/database/data.source";
import { InventoryClient } from "../../domain/clients/inventory.client";
import { CatalogClient } from "../../domain/clients/catalog.client";
import { ReportConsumer } from "../../infrastructure/events/report.consumer";
import { RabbitMQConnection } from "../../../../shared/infrastructure/rabbitmq/rabbitmq.connection";

export default class CoreConfigurations{
  private env= new Environment()
  private dbSource= new AppDataSource().instance_validator()
  private back= new AppCore()

  constructor(){
    this.initializeDBandBack()
  }

  private initializeDBandBack(){
    this.dbSource.initialize().then(() =>{
      console.log(InitializeConstants.dbConnectionEstablished({db:this.env.db_name, port:this.env.db_port}))
      this.consumers_clients()
      this.config_back({portBack: this.env.port})
      RabbitMQConnection.getChannel().catch((error) => {
        console.log(InitializeConstants.toolConnectionFailed({tool: "rabbitmq", error_code: error.code}))
      })
    }).catch((error)=>{
      console.log(InitializeConstants.dbConnectionFailed({db: this.env.db_name, port: this.env.db_port, error_code: error.code}))
    })
  }

  private config_back({portBack}:{portBack: number}){
    this.back.app.listen(portBack, () =>{
      console.log(InitializeConstants.infoBackActive({port: portBack, ms_name: "report"}))
    })
  }

  private async consumers_clients(){
    const clients= {inventory: new InventoryClient(), catalog: new CatalogClient()}
    await ReportConsumer.start(clients)
  }
}