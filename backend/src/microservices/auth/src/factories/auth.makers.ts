import { User } from "../domain/entities/users"
import { Role } from "../domain/entities/roles"
import { AuthControllers } from "../features/auth/auth.controller"
import { AuthUseCases } from "../features/auth/auth.use.cases"
import { UserRepository, RoleRepository } from "../features/auth/auth.repository"
import AppDataSource from "../infrastructure/config/database/data.source"
import { JwtService } from "../infrastructure/middlewares/jwt.service"
import { Environment } from "../core/config/env/env"

export class AuthMakers{
  constructor(private readonly env: Environment){}

  async instance(): Promise<AuthControllers>{
    const source= new AppDataSource().validate_instance()
    const userRepo= new UserRepository(source.getRepository(User))
    const roleRepo= new RoleRepository(source.getRepository(Role))
    const jwt= new JwtService(this.env)

    const useCase= new AuthUseCases(userRepo, roleRepo, jwt)
    return new AuthControllers(useCase)
  }
}