import { Role } from "../../domain/entities/roles";
import { User } from "../../domain/entities/users";
import { SeedConstants } from "../../shared/constants/SeedConstants";
import { AppDataSource } from "../config/database/DataSource";
import { UserRepository } from "../config/database/UserRepository";
import { env } from "../env/env";
import bcrypt from "bcrypt"

export const seedBaseUser = async(data: Role) =>{
  const userSource= AppDataSource.getRepository(User)
  const userRepo = new UserRepository(userSource)

  const searchBaseUser= await userRepo.findByEmail(env.base_user_email)
  if(searchBaseUser != null)
    return console.log(SeedConstants.BASE_USER_SEARCH_FALSE)
  
  const baseUser: Omit<User, "user_id" | "created_at" | "updated_at">={
    first_name: env.base_user_firstname,
    last_name: env.base_user_lastname,
    email: env.base_user_email,
    password_hash: await bcrypt.hash(env.base_user_password, 10) ,
    role: data,
    is_active: env.base_user_isActive,
  }

  const final= await userRepo.createUser(baseUser)
  console.log(SeedConstants.usuarioCreado(final.role.name, final.first_name))
}
