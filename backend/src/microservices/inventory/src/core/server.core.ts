import "reflect-metadata"
import serverconfigurations from "./config/config"

const server= new serverconfigurations().initializeDBandBack()
