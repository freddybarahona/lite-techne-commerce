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
  db_password: String(process.env.DB_PASSWORD),

  //jwt data
  jwtSecret: String(process.env.JWT_SECRET),

  //seeds data
  role_1_id:Number(process.env.ROLE_1_ID),
  role_1_name:String(process.env.ROLE_1_NAME),
  role_1_description:String(process.env.ROLE_1_DESCRIPTION),

  role_2_id:Number(process.env.ROLE_2_ID),
  role_2_name:String(process.env.ROLE_2_NAME),
  role_2_description:String(process.env.ROLE_2_DESCRIPTION),

  role_3_id:Number(process.env.ROLE_3_ID),
  role_3_name:String(process.env.ROLE_3_NAME),
  role_3_description:String(process.env.ROLE_3_DESCRIPTION),

  base_user_firstname:String(process.env.BASE_USER_FIRSTNAME),
  base_user_lastname:String(process.env.BASE_USER_LASTNAME),
  base_user_email:String(process.env.BASE_USER_EMAIL),
  base_user_password:String(process.env.BASE_USER_PASSWORD),
  base_user_isActive:Boolean(process.env.BASE_USER_ISACTIVE),


}
//que todas estas conversiones se hagan desde el env.ts
//y asi nunca retorna undefined