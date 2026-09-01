import { DataSource } from "typeorm";
import { Environment } from "../env/env";
import { Inventory } from "../../../domain/entities/inventory";
import path from "node:path";

export default class AppDataSource{
  env= new Environment()
  dataSource= new DataSource({
    type: "mssql", //sql server
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