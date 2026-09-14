import AppCore from "../app.core";
import { Environment } from "./env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import AppDataSource from "../../infrastructure/database/data.source";
import { InventoryClient } from "../../domain/clients/inventory.client";
import { CatalogClient } from "../../domain/clients/catalog.client";
import { InventoryHistory } from "../../domain/entities/inventory.history";
import { InventoryHistoryRepository } from "../../features/inventory.history/inventory.history.repository";
import { ReportConsumer } from "../../infrastructure/events/report.consumer";
import { RabbitMQConnection } from "../../../../shared/infrastructure/rabbitmq/rabbitmq.connection";
import DatabaseBootstrap from "../../../../shared/helpers/database/bootstrap"

export default class CoreConfigurations{
  private env= new Environment()
  private dbSource= new AppDataSource().instance_validator()
  private back= new AppCore()

  constructor(){
    this.initializeDBandBack()
  }

  private async initializeDBandBack(){
    await new DatabaseBootstrap().createDatabase({
      host: this.env.db_host,
      port: this.env.db_port,
      username: this.env.db_user,
      password: this.env.db_password,
      database: this.env.db_name
    })
    this.dbSource.initialize().then(() =>{
      console.log(InitializeConstants.dbConnectionEstablished({db:this.env.db_name, port:this.env.db_port}))
      this.consumers_clients()
      this.config_back({portBack: this.env.port})
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
    const inventoryHistoryRepo= new InventoryHistoryRepository(this.dbSource.getRepository(InventoryHistory))
    const clients= {inventory: new InventoryClient(inventoryHistoryRepo), catalog: new CatalogClient(inventoryHistoryRepo)}
    await ReportConsumer.start(clients).catch((error)=> {
      console.log(InitializeConstants.toolConnectionFailed({tool:"rabbitmq", error_code: error.code}))
    })
  }
}