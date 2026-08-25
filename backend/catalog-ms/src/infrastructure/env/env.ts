import dotenv from "dotenv"

dotenv.config()
export const env= {
    port: Number(process.env.PORT_BACK),

    //info base de datos
    db_host: String(process.env.DB_HOST),
    db_port: Number(process.env.DB_PORT),
    db_user: String(process.env.DB_USER),
    db_password: String(process.env.DB_PASSWORD),
    db_name: String(process.env.DB_NAME),

    //info de semillas
    category_1_id: Number(process.env.CATEGORY_1_ID),
    category_1_name: String(process.env.CATEGORY_1_NAME),
    category_1_description: String(process.env.CATEGORY_1_DESCRIPTION),

    category_2_id: Number(process.env.CATEGORY_2_ID),
    category_2_name: String(process.env.CATEGORY_2_NAME),
    category_2_description: String(process.env.CATEGORY_2_DESCRIPTION),

    category_3_id: Number(process.env.CATEGORY_3_ID),
    category_3_name: String(process.env.CATEGORY_3_NAME),
    category_3_description: String(process.env.CATEGORY_3_DESCRIPTION),

    category_4_id: Number(process.env.CATEGORY_4_ID),
    category_4_name: String(process.env.CATEGORY_4_NAME),
    category_4_description: String(process.env.CATEGORY_4_DESCRIPTION),
}