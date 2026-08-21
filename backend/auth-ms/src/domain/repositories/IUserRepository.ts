import { User } from "../entities/users"

export interface IUserRepository{
  createUser(data: Omit<User, "user_id" | "created_at" | "updated_at">): Promise<User>
  findByEmail(data: string): Promise<User | null>
  ifExistsName(data: string): Promise<Boolean>
  ifExistsID(data: number): Promise<Boolean>
}