import { Repository } from "typeorm"
import { User } from "../../domain/entities/users"
import { Role } from "../../domain/entities/roles"

export interface IUserRepository{
  ifExistsEmail({email}:{email: string}): Promise<boolean>
  createUser({entity}:{entity: Omit<User, "user_id" | "created_at" | "updated_at">}): Promise<User>
  findByEmail({email}:{email: string}): Promise<User | null>
}

export interface IRoleRepository{
  findRoleById({id}:{id: number}): Promise<Role | null>
  createRole({entity}:{entity: Omit<Role, "created_at" | "deleted_at" | "users">}): Promise<Role>
}