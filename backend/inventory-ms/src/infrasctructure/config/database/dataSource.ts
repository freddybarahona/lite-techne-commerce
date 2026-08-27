import path from "node:path";
import { DataSource } from "typeorm";
import { env } from "../env/env";

export const AppdDataSource = new DataSource({
  type: "mssql", //sql server
  host: env.db_host,
  port: env.db_port,
  username: env.db_user,
  password: env.db_password,
  database: env.db_name,
  options: {encrypt: true, trustServerCertificate: true},
  entities:[],
  migrations:[
    path.join(__dirname, "../../migrations/*.js")
  ],
  synchronize: false,
  logging: false
})