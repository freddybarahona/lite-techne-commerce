import "reflect-metadata"
import { serverconfigurations } from "./config/config"
import { Environment } from "../infrastructure/config/env/env"
import { AppCore } from "./app.core"
import { MyConnectionOptions } from "../features/product/inventory.types"
import { AppDataSource } from "../infrastructure/config/database/data.source"
const envVars= new Environment
const app= new AppCore
const connections: MyConnectionOptions={type: "mssql"}
const server= new serverconfigurations({env: envVars, typeDB: connections, app: app})

const Server_activo=server.initializeDBandBack()