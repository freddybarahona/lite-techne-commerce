import dotenv from "dotenv"

dotenv.config()
export const env= {
    port: Number(process.env.PORT_BACK),

    //info base de datos
    db_host: String(process.env.DB_HOST),
    db_port: Number(process.env.DB_PORT),
    db_user: String(process.env.DB_USER),
    db_password: String(process.env.DB_PASSWORD),
    db_name: String(process.env.DB_NAME)
}