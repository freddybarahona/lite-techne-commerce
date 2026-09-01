import { DataSource } from "typeorm";
import { Environment } from "../../infrastructure/config/env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import AppDataSource from "../../infrastructure/config/database/data.source";
import AppCore from "../app.core";

export default class serverconfigurations{
    initializeDBandBack(){
      const env = new Environment
      const dbSource= this.database()
      dbSource.initialize().then(()=>{
          console.log(InitializeConstants.dbConnectionEstablished({db:env.db_name, port:env.db_port}))
          this.config_back({portBack: env.port})
      })
    }

    database(): DataSource{
      const dataSource= new AppDataSource() 
        return dataSource.dataSource
    }

    config_back({portBack}: {portBack: number}){
      const back= new AppCore()
      back.app.listen(portBack,() => {
        console.log(InitializeConstants.infoBackActive({port:portBack, ms_name:"inventory"}))
      })
    }
}