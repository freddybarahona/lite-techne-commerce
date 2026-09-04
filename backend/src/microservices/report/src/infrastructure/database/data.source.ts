import { DataSource } from "typeorm"
import { Environment } from "../../core/config/env/env"
import path from "node:path"


export default class AppDataSource{
  env= new Environment()
  private static instance: DataSource | null = null

  create_get_instance(): DataSource{
    if(!AppDataSource.instance){
      AppDataSource.instance= new DataSource({
        type: "mssql", //sql server
        host: this.env.db_host,
        port: this.env.db_port,
        username: this.env.db_user,
        password: this.env.db_password,
        database: this.env.db_name,
        options: { encrypt: true, trustServerCertificate: true},
        entities: [],
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