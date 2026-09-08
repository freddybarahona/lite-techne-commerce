import { DataSource } from "typeorm"
import { Environment } from "../../../core/config/env/env"
import { User } from "../../../domain/entities/users"
import { Role } from "../../../domain/entities/roles"
import path from "node:path"

export default class AppDataSource{
  env= new Environment()
  private static instance: DataSource | null = null

  validate_instance(): DataSource{
    if(!AppDataSource.instance){
      AppDataSource.instance= new DataSource({
        type: "postgres",
        host: this.env.db_host,
        port: this.env.db_port,
        username: this.env.db_user,
        password: this.env.db_password,
        database: this.env.db_name,
        entities: [User, Role],
        migrations: [
          path.join(__dirname, "../../migrations/*.js")
        ],
        synchronize: false,
        logging: false
      })
    }
    return AppDataSource.instance
  }
}