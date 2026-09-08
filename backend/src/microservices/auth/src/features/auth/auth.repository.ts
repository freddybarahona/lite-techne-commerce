import { Repository } from "typeorm"
import { User } from "../../domain/entities/users"
import { Role } from "../../domain/entities/roles"
import { IUserRepository, IRoleRepository } from "./auth.repository.interface"

export class UserRepository implements IUserRepository{
  constructor(private readonly repository: Repository<User>){}

  async ifExistsEmail({email}:{email: string}): Promise<boolean>{
    return this.repository.existsBy({email})
  }

  async createUser({entity}:{entity: Omit<User, "user_id" | "created_at" | "updated_at">}): Promise<User>{
    return this.repository.save(await this.repository.create(entity))
  }

  async findByEmail({email}:{email: string}): Promise<User | null>{
    return this.repository.findOne({where: {email}, relations: {role: true}})
  }
}

export class RoleRepository implements IRoleRepository{
  constructor(private readonly repository: Repository<Role>){}

  async findRoleById({id}:{id: number}): Promise<Role | null>{
    return this.repository.findOneBy({role_id: id})
  }

  async createRole({entity}:{entity: Omit<Role, "created_at" | "deleted_at" | "users">}): Promise<Role>{
    return this.repository.save(await this.repository.create(entity))
  }
}