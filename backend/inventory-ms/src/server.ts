import "reflect-metadata"
import app from "./app"
import { initializeConstants } from "./shared/constants/InitializeConstants"
import { env } from "./infrasctructure/config/env/env"


const port = env.port
console.log(port)
app.listen(port, () => { 
  console.log(initializeConstants.infoBackActive(port, "inventory"))
})