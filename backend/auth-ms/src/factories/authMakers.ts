import { GetProfileController } from "../adapters/controllers/GetProfileController"
import { LoginController } from "../adapters/controllers/LoginController"
import { JwtService } from "../adapters/middlewares/JwtService"
import { GetProfileUseCase } from "../application/use-cases/GetProfileUseCase"
import { loginUseCase } from "../application/use-cases/LoginUseCase"
import { Role } from "../domain/entities/roles"
import { User } from "../domain/entities/users"
import { AppDataSource } from "../infrastructure/config/database/DataSource"
import { RoleRepository } from "../infrastructure/config/database/RoleRepository"
import { UserRepository } from "../infrastructure/config/database/UserRepository"

const userSource= AppDataSource.getRepository(User)
const roleSource= AppDataSource.getRepository(Role)
const userRepository = new UserRepository(userSource)

export const makeGetProfile = ()=>{
  const useCase = new GetProfileUseCase(userRepository)
  return new GetProfileController(useCase)
}

export const makeLogin = () =>{
  const jwt = new JwtService
  const roleRepo = new RoleRepository(roleSource)
  const useCase = new loginUseCase(userRepository, roleRepo, jwt)
  return new LoginController(useCase)
}