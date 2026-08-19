import "reflect-metadata"
import dotenv from "dotenv"
import { env } from "./src/infrastructure/env/env"
import app from "./app"

dotenv.config()

const PORT = env.port

console.log(PORT)

app.listen(PORT, () =>{
  console.log(`Auth service corriendo en puerto ${PORT}`)
})

