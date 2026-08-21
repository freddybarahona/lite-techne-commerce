import { GetProfileController } from "../adapters/controllers/GetProfileController"
import { LoginController } from "../adapters/controllers/LoginController"
import { JwtService } from "../adapters/middlewares/JwtService"
import { GetProfileUseCase } from "../application/use-cases/GetProfileUseCase"
import { loginUseCase } from "../application/use-cases/LoginUseCase"
import { User } from "../domain/entities/users"
import { AppDataSource } from "../infrastructure/config/database/DataSource"
import { UserRepository } from "../infrastructure/config/database/UserRepository"

const userSource= AppDataSource.getRepository(User)
const userRepository = new UserRepository(userSource)

export const makeGetProfile = ()=>{
  const useCase = new GetProfileUseCase(userRepository)
  return new GetProfileController(useCase)
}

export const makeLogin = () =>{
  const jwt = new JwtService
  const useCase = new loginUseCase(userRepository, jwt)
  return new LoginController(useCase)
}