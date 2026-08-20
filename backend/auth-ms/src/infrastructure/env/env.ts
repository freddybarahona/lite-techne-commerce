import dotenv from "dotenv";


dotenv.config()

export const env= {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV ?? "development",

  //BD data
  db_host: "localhost",
  db_port: Number(process.env.DB_PORT),
  db_name: String(process.env.DB_NAME),
  db_user: String(process.env.DB_USER),
  db_password: String(process.env.DB_PASSWORD)
}
//que todas estas conversiones se hagan desde el env.ts
//y asi nunca retorna undefined