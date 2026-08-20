import { GetProfileController } from "../adapters/controllers/GetProfileController"
import { GetProfileUseCase } from "../application/use-cases/GetProfileUseCase"
import { User } from "../domain/entities/users"
import { AppDataSource } from "../infrastructure/config/database/DataSource"
import { UserRepository } from "../infrastructure/config/database/UserRepository"

const userSource= AppDataSource.getRepository(User)
const userRepository = new UserRepository(userSource)

export const makeGetProfile = ()=>{
  const useCase = new GetProfileUseCase(userRepository)
  return new GetProfileController(useCase)
}
