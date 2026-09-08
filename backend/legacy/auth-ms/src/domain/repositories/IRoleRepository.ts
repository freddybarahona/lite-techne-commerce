import { Role } from "../entities/roles";

export interface IRoleRepository{
  findRoleById(data: number | Role): Promise<Role | null>
  createRole(data: Omit<Role, "created_at" | "deleted_at" | "users">): Promise<Role>
}