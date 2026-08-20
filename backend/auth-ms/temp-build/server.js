import "reflect-metadata";
import dotenv from "dotenv";
import { env } from "./src/infrastructure/env/env";
import app from "./app";
import { AppDataSource } from "./src/infrastructure/config/database/DataSource";
dotenv.config();
const port = env.port;
AppDataSource.initialize().then(() => {
    console.log("Conexion BD establecida");
    app.listen(port, () => {
        console.log(`Auth service corriendo en el puerto ${port}`);
    });
});
