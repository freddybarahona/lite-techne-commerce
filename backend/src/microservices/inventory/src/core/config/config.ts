import { DataSource } from "typeorm";
import { Environment } from "../../infrastructure/config/env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import AppDataSource from "../../infrastructure/config/database/data.source";
import AppCore from "../app.core";

export default class serverconfigurations{
    env = new Environment
    dbSource= new AppDataSource().dataSource
    back= new AppCore
    
    initializeDBandBack(){
      this.dbSource.initialize().then(()=>{
          console.log(InitializeConstants.dbConnectionEstablished({db:this.env.db_name, port:this.env.db_port}))
          this.config_back({portBack: this.env.port})
      })
    }

    config_back({portBack}: {portBack: number}){
      this.back.app.listen(portBack,() => {
        console.log(InitializeConstants.infoBackActive({port:portBack, ms_name:"inventory"}))
      })
    }
}