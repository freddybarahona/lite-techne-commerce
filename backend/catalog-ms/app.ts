import express from "express"
import cors from "cors"
import catalogRoutes from "./src/adapters/routes/catalogRoutes"
import productRoutes from "./src/adapters/routes/productRoutes"

const app = express()
app.use(express.json())
app.use(cors({origin: "*"}))

//registro de rutas
app.use("/catalogs", catalogRoutes)
app.use("/products", productRoutes)

export default app