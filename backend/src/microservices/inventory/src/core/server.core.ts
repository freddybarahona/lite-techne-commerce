import "reflect-metadata"
import { Environment } from "../infrastructure/config/env/env"
import serverconfigurations from "./config/config"

const envVars= new Environment
const server= new serverconfigurations()

server.initializeDBandBack()