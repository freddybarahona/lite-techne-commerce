import "reflect-metadata"
import dotenv from "dotenv"
import { env } from "./src/infrastructure/env/env"
import app from "./app"
import { AppDataSource } from "./src/infrastructure/config/database/DataSource"
import { seedRoles } from "./src/infrastructure/seed/seedRoles"
import { InitializeConstants } from "./src/shared/constants/InitializeConstants"

dotenv.config()

const port = env.port

AppDataSource.initialize().then(() =>{
  console.log(InitializeConstants.DB_CONNECTION_ESTABLISHED)
  seedRoles()
  app.listen(port, () =>{
    console.log(InitializeConstants.infoBackActive(port))
  })
})


