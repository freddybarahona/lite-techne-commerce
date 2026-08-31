import { DataSource } from "typeorm";
import { Environment } from "../../infrastructure/config/env/env";
import { Inventory } from "../../domain/entities/inventory";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
import { AppCore } from "../app.core";
import path from "node:path";
import { MyConnectionOptions } from "../../features/product/product.types";

export class serverconfigurations{
  constructor(
      private env: Environment,
      private connect: MyConnectionOptions,
      private app: AppCore
    ){}
    async initializeDBandBack(){
      const dbSource=await this.database()
      dbSource.initialize().then(()=>{
          console.log(InitializeConstants.dbConnectionEstablished(this.env.db_name,this.env.db_port))
          this.back({portBack: this.env.port})
      })
    }

    private async database(): Promise<DataSource>{
        return await new DataSource({
              type: this.connect.type, //sql server
              host: this.env.db_host,
              port: this.env.db_port,
              username: this.env.db_user,
              password: this.env.db_password,
              database: this.env.db_name,
              options: { encrypt: true, trustServerCertificate: true},
              entities: [Inventory],
              migrations:[
                path.join(__dirname, "../../migrations/*.js")
              ],
              synchronize: false,
              logging: false
            })
    }

    back({portBack}: {portBack: number}){
      this.app.config.listen(portBack,() => {
        console.log(InitializeConstants.infoBackActive(portBack, "inventory"))
      })
    }
}