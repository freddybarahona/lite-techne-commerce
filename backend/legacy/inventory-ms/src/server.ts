import "reflect-metadata" 
import app from "./app"
import { initializeConstants } from "./shared/constants/InitializeConstants"
import { env } from "./infrasctructure/config/env/env"
import { AppDataSource } from "./infrasctructure/config/database/dataSource"


const port = env.port

const db_name= env.db_name
const db_port= env.db_port


AppDataSource.initialize().then(() => {
  console.log(initializeConstants.dbConnectionEstablished(db_name, db_port))
  app.listen(port, () => { 
    console.log(initializeConstants.infoBackActive(port, "inventory"))
  })
})