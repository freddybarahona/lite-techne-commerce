import { DataSource } from "typeorm";
import { Environment } from "../../infrastructure/config/env/env";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import { AppCore } from "../app.core";
import { MyConnectionOptions } from "../../features/product/inventory.types";
import { AppDataSource } from "../../infrastructure/config/database/data.source";

export class serverconfigurations{
  private env: Environment
  private typeDB: MyConnectionOptions
  private app: AppCore


  constructor({env, typeDB, app}: {env: Environment, typeDB:MyConnectionOptions, app:AppCore}){
    this.env= env
    this.typeDB= typeDB
    this.app= app
  }
    async initializeDBandBack(){
      const dbSource=await this.database()
      dbSource.initialize().then(()=>{
          console.log(InitializeConstants.dbConnectionEstablished(this.env.db_name,this.env.db_port))
          this.back({portBack: this.env.port})
      })
    }

    async database(): Promise<DataSource>{
        return await AppDataSource.dataSource(this.typeDB,this.env)
    }

    back({portBack}: {portBack: number}){
      this.app.config.listen(portBack,() => {
        console.log(InitializeConstants.infoBackActive(portBack, "inventory"))
      })
    }
}