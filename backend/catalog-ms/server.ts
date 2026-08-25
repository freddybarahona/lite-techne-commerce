import "reflect-metadata"
import dotenv from "dotenv"
import { env } from "./src/infrastructure/env/env"
import app from "./app"
import { initializeConstants } from "./src/shared/constants/InitializeConstants"

dotenv.config()

const port = env.port

app.listen(port, () => {
    console.log(initializeConstants.infoBackActive(port))
})

