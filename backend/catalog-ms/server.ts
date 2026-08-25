import "reflect-metadata"
import dotenv from "dotenv"
import { env } from "./src/infrastructure/env/env"
import app from "./app"
import { initializeConstants } from "./src/shared/constants/InitializeConstants"
import { AppdDataSource } from "./src/infrastructure/config/database/dataSource"
import { seedCategories } from "./src/infrastructure/seed/seedCategories"

dotenv.config()

const port = env.port
const db_name = env.db_name
const db_port = env.db_port

AppdDataSource.initialize().then(() => {
  console.log(initializeConstants.dbConnectionEstablished(db_name, db_port))
  seedCategories()
  app.listen(port, () => {
    console.log(initializeConstants.infoBackActive(port))
  })
})

