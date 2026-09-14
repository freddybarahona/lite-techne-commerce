import bcrypt from "bcrypt"
import { Role } from "../../domain/entities/roles"
import { User } from "../../domain/entities/users"
import { UserRepository } from "../../features/auth/auth.repository"
import AppDataSource from "../config/database/data.source"
import { Environment } from "../../core/config/env/env"

export class SeedBaseUser{
  private source= new AppDataSource().validate_instance()

  constructor(private readonly env: Environment){}

  async start(data: Role){
    const userRepo= new UserRepository(this.source.getRepository(User))

    const searchBaseUser= await userRepo.findByEmail({email: this.env.base_user_email})
    if(searchBaseUser != null){
      console.log("Usuario base ya existe")
      return
    }

    const baseUser: Omit<User, "user_id" | "created_at" | "updated_at">={
      first_name: this.env.base_user_firstname,
      last_name: this.env.base_user_lastname,
      email: this.env.base_user_email,
      password_hash: await bcrypt.hash(this.env.base_user_password, 10),
      role: data,
      is_active: this.env.base_user_isActive,
    }

    const final= await userRepo.createUser({entity: baseUser})
    console.log(`${final.role.name} base ${final.first_name} se creo con exito`)
  }
}