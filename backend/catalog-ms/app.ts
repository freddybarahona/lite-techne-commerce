import express from "express"
import cors from "cors"
import categoriesRoutes from "./src/adapters/routes/categoriesRoutes"
import productRoutes from "./src/adapters/routes/productRoutes"

const app = express()
app.use(express.json())
app.use(cors({origin: "*"}))

//registro de rutas
app.use("/categories", categoriesRoutes)
app.use("/products", productRoutes)

export default app