import { RegisterUserRequest } from "../../application/model/requests/RegisterUserRequest"
import { User } from "../entities/users"

export interface IUserRepository{
  IfExistsEmail(data: string): Promise<boolean>
  createUser(data: Omit<User, "user_id" | "created_at" | "updated_at"> | RegisterUserRequest): Promise<User>
  findByEmail(data: string): Promise<User | null>
  ifExistsName(data: string): Promise<boolean>
  ifExistsID(data: number): Promise<boolean>
}