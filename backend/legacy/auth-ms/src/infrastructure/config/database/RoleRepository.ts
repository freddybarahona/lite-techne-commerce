import { Repository } from "typeorm";
import { Role } from "../../../domain/entities/roles";
import { AppDataSource } from "./DataSource";
import { IRoleRepository } from "../../../domain/repositories/IRoleRepository";

export class RoleRepository implements IRoleRepository{
  constructor(private readonly repository: Repository<Role>){
    this.repository= AppDataSource.getRepository(Role)
  }
  async createRole(data: Omit<Role, "created_at" | "deleted_at" | "users">): Promise<Role> {
    const result = await this.repository.save(await this.repository.create(data))
    return result
  }
  async findRoleById(data: number): Promise<Role | null> {
    const result = await this.repository.findOneBy({role_id: data})
    return result  
  }

  
}