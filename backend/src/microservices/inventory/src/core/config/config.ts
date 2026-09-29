import { Environment } from "./env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import AppDataSource from "../../infrastructure/config/database/data.source";
import AppCore from "../app.core";
import { RabbitMQConnection } from "../../../../shared/infrastructure/rabbitmq/rabbitmq.connection";
import DatabaseBootstrap from "../../../../shared/helpers/database/bootstrap"

export default class serverconfigurations{
    env = new Environment
    dbSource= new AppDataSource().create_get_instance()
    back= new AppCore

    async initializeDBandBack(){
      await new DatabaseBootstrap().createDatabase({
        host: this.env.db_host,
        port: this.env.db_port,
        username: this.env.db_user,
        password: this.env.db_password,
        database: this.env.db_name
      })
      this.dbSource.initialize().then(()=>{
          console.log(InitializeConstants.dbConnectionEstablished({db:this.env.db_name, port:this.env.db_port}))
          this.config_back({portBack: this.env.port})
          RabbitMQConnection.getChannel().catch((error)=>{
            console.log(InitializeConstants.toolConnectionFailed({tool:"rabbitmq", error_code: error.code}))
          })
      }).catch((error) => {
        console.error(InitializeConstants.dbConnectionFailed({db: this.env.db_name, port: this.env.db_port, error_code: error.code}))
      })
    }

    config_back({portBack}: {portBack: number}){
      this.back.app.listen(portBack,() => {
        console.log(InitializeConstants.infoBackActive({port:portBack, ms_name:"inventory"}))
      })
    }
}