import { Role } from "../../domain/entities/roles"
import { SeedConstants } from "../../shared/constants/SeedConstants"
import { AppDataSource } from "../config/database/DataSource"
import { RoleRepository } from "../config/database/RoleRepository"
import { env } from "../env/env"
import { seedBaseUser } from "./seedBaseUsers"

export const seedRoles =async ()=>{
  const roleSource= AppDataSource.getRepository(Role)
  const roleRepo= new RoleRepository(roleSource)
  const roles: Omit<Role, "created_at" | "deleted_at" | "users">[]=[
    {role_id: env.role_1_id, name: env.role_1_name, description: env.role_1_description},
    {role_id: env.role_2_id, name: env.role_2_name, description: env.role_2_description},
    {role_id: env.role_3_id, name: env.role_3_name, description: env.role_3_description}
  ]

  for(let i=0; i< roles.length; i++){
    let actualRole= await roleRepo.findRoleById(roles[i].role_id)
    if(actualRole == null){
      console.log(SeedConstants.roleNotExist(roles[i].name))
      await roleRepo.createRole(roles[i])
      console.log(SeedConstants.roleCreated(roles[i].name))
    }
  }
  const baseRole = await roleRepo.findRoleById(roles[0].role_id)
  seedBaseUser(baseRole!)
}