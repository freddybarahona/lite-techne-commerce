import { Role } from "../../../domain/entities/roles"

export interface RegisterUserRequest{
  first_name: string
  last_name: string
  email: string
  password_hash: string
  is_active: boolean | null
  //el is_active 
  //default:true
  role: number | Role 
}