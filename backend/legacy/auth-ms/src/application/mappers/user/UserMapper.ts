import { Role } from "../../../domain/entities/roles";
import { User } from "../../../domain/entities/users";
import { UserDTO } from "../../model/DTOs/UserDTO";
import { RegisterUserRequest } from "../../model/requests/RegisterUserRequest";
import bcrypt from "bcrypt"

export class UserMapper{
  static mapDTO(data: User): UserDTO{
    return {
      user_id: data.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      is_active: data.is_active,
      role: data.role.name
    }
  }
  
  static async mapEnt(data: RegisterUserRequest, role: Role): Promise<User>{
    const {password, role: role_id, ...userData} = data
    // Extrae propiedades específicas del objeto y con ...userData
    // agrupa automáticamente todas las propiedades restantes en un nuevo objeto.
    const user = Object.assign(new User(), userData)
    user.password_hash= await this.hasher(data.password)
    user.role = role
    user.is_active= true
    return user
  }

  static async hasher(data: string){
    return await bcrypt.hash(data, 10)
  }
}