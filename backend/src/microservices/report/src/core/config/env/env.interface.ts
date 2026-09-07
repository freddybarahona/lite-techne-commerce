import { Interface } from "node:readline"


export interface IEnv{
  //datos de back
  port: number

  //datos de bd
  db_host: string
  db_port: number
  db_user: string
  db_password: string
  db_name: string
}