import "reflect-metadata"
import { serverconfigurations } from "./config/config"
import { Environment } from "../infrastructure/config/env/env"
import { AppCore } from "./app.core"
import { MyConnectionOptions } from "../features/product/product.types"
const envVars= new Environment
const app= new AppCore
const connections: MyConnectionOptions={type: "mssql"}
const server= new serverconfigurations(envVars, connections, app)

server.initializeDBandBack()