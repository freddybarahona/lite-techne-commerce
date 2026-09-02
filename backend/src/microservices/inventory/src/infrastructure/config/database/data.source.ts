import { DataSource } from "typeorm";
import { Environment } from "../env/env";
import { Inventory } from "../../../domain/entities/inventory";
import path from "node:path";

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
        entities: [Inventory],
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

/* esta forma es mejor que la anterior ya que esta valida si ya hay una instancia
previa de la base de datos pero si no lo hay crea una para el uso en durante
toda la ejecucion del proyecto por eso tienes que tener presente estos detalles 
para hacer */

