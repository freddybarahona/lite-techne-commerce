import { Interface } from "node:readline"


export interface IEnv{
  port: number
  db_host: string
  db_port: number
  db_user: string
  db_password: string
  db_name: string
}