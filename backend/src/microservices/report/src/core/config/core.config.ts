import AppCore from "../app.core";
import { Environment } from "./env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import AppDataSource from "../../infrastructure/database/data.source";

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
}