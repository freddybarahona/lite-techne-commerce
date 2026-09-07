import { Environment } from "./env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import AppDataSource from "../../infrastructure/config/database/data.source";
import AppCore from "../app.core";
import { SeedCategories } from "../../infrastructure/seed/seed.categories";

export default class serverconfigurations{
    env = new Environment
    dbSource= new AppDataSource().validate_instance()
    back= new AppCore

    constructor(){
      this.initializeDBandBack()
    }

    private initializeDBandBack(){
      this.dbSource.initialize().then(()=>{
          console.log(InitializeConstants.dbConnectionEstablished({db:this.env.db_name, port:this.env.db_port}))
          new SeedCategories(this.env).start()
          this.config_back({portBack: this.env.port})
      }).catch((error)=>{
          console.log(InitializeConstants.dbConnectionFailed({db: this.env.db_name, port: this.env.db_port, error_code: error.code}))
      })
    }

    private config_back({portBack}: {portBack: number}){
      this.back.app.listen(portBack,() => {
        console.log(InitializeConstants.infoBackActive({port:portBack, ms_name:"catalog"}))
      })
    }
}