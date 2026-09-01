import { DataSource } from "typeorm";
import { Environment } from "../../infrastructure/config/env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import { AppCore } from "../app.core";
import { MyConnectionOptions } from "../../features/product/inventory.types";
import { AppDataSource } from "../../infrastructure/config/database/data.source";

export class serverconfigurations{
  private env: Environment


  constructor({env}: {env: Environment}){
    this.env= env
  }
    initializeDBandBack(){
      const dbSource= this.database()
      dbSource.initialize().then(()=>{
          console.log(InitializeConstants.dbConnectionEstablished({db:this.env.db_name, port:this.env.db_port}))
          this.config_back({portBack: this.env.port})
      })
    }

    database(): DataSource{
        return AppDataSource.create(this.env)
    }

    config_back({portBack}: {portBack: number}){
      const back= AppCore.appConfig()
      back.listen(portBack,() => {
        console.log(InitializeConstants.infoBackActive({port:portBack, ms_name:"inventory"}))
      })
    }
}