import { DataSource } from "typeorm";
import { Environment } from "../env/env";
import { Inventory } from "../../../domain/entities/inventory";
import path from "node:path";

export default class AppDataSource{
  constructor(){
    this.create()
  }

  create(): DataSource{
    const env= new Environment
    return new DataSource({
              type: "mssql", //sql server
              host: env.db_host,
              port: env.db_port,
              username: env.db_user,
              password: env.db_password,
              database: env.db_name,
              options: { encrypt: true, trustServerCertificate: true},
              entities: [Inventory],
              migrations:[
                path.join(__dirname, "../../migrations/*.js")
              ],
              synchronize: false,
              logging: false
            })
  }
}