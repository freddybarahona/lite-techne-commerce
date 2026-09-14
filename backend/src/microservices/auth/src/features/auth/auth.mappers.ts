import bcrypt from "bcrypt"
import { Role } from "../../domain/entities/roles"
import { User } from "../../domain/entities/users"
import { UserDTO } from "../DTOs/user.DTO"
import { RegisterUserRequest } from "../requests/register.user.request"

export class UserMapper{
  static mapEntityToDTO({entity}:{entity: User}): UserDTO{
    const dto= new UserDTO()
    dto.user_id= entity.user_id
    dto.first_name= entity.first_name
    dto.last_name= entity.last_name
    dto.email= entity.email
    dto.is_active= entity.is_active
    dto.role= entity.role.name
    return dto
  }

  static async mapEnt({request, role}:{request: RegisterUserRequest, role: Role}): Promise<User>{
    const user= new User()
    user.first_name= request.first_name
    user.last_name= request.last_name
    user.email= request.email
    user.password_hash= await this.hasher(request.password)
    user.role= role
    user.is_active= true
    return user
  }

  static hasher(data: string): Promise<string>{
    return bcrypt.hash(data, 10)
  }
}