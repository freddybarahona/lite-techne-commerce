import { Role } from "../../domain/entities/roles"
import { RoleRepository } from "../../features/auth/auth.repository"
import AppDataSource from "../config/database/data.source"
import { Environment } from "../../core/config/env/env"
import { SeedBaseUser } from "./seed.base.users"

export class SeedRoles{
  private source= new AppDataSource().validate_instance()

  constructor(private readonly env: Environment){}

  async start(){
    const roleRepo= new RoleRepository(this.source.getRepository(Role))
    const roles: Omit<Role, "created_at" | "deleted_at" | "users">[]=[
      {role_id: this.env.role_1_id, name: this.env.role_1_name, description: this.env.role_1_description},
      {role_id: this.env.role_2_id, name: this.env.role_2_name, description: this.env.role_2_description},
      {role_id: this.env.role_3_id, name: this.env.role_3_name, description: this.env.role_3_description}
    ]

    for(let i=0; i < roles.length; i++){
      const actualRole= await roleRepo.findRoleById({id: roles[i].role_id})
      if(actualRole == null){
        console.log(`el rol ${roles[i].name} no existe, se procedera a crearse`)
        await roleRepo.createRole({entity: roles[i]})
        console.log(`el rol ${roles[i].name} se creo con exito`)
      }
    }
    const baseRole = await roleRepo.findRoleById({id: roles[0].role_id})
    await new SeedBaseUser(this.env).start(baseRole!)
  }
}