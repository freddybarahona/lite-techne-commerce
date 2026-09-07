import { DataSource } from "typeorm"
import { Environment } from "../../core/config/env/env"
import { InventoryHistory } from "../../domain/entities/inventory.history"
import path from "node:path"


export default class AppDataSource{
  private env= new Environment()
  private static instance: DataSource | null = null

  instance_validator(): DataSource{
    if(!AppDataSource.instance){
      AppDataSource.instance= new DataSource({
        type: "mssql", //sql server
        host: this.env.db_host,
        port: this.env.db_port,
        username: this.env.db_user,
        password: this.env.db_password,
        database: this.env.db_name,
        options: { encrypt: true, trustServerCertificate: true},
        entities: [InventoryHistory],
        migrations:[
          path.join(__dirname, "../../migrations/*.js")
        ],
        synchronize: false,
        logging: false
      })
    }
    return AppDataSource.instance
  }
}