import { DataSource } from "typeorm";
import { env } from "../../env/env";
import { User } from "../../../domain/entities/users";
import { Role } from "../../../domain/entities/roles";
import path from "node:path";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db_host,
  port: env.db_port,
  username: env.db_user,
  password: env.db_password,
  database: env.db_name,
  entities:[User, Role],
  migrations:[
    path.join(__dirname, "../../migrations/*.js")
  ],
  synchronize: true,
  logging: false //muestra sql en consola
})