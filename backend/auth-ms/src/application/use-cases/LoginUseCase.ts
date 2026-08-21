import { formResponse } from "../../adapters/middlewares/FormResponse";
import { JwtService } from "../../adapters/middlewares/JwtService";
import { Role } from "../../domain/entities/roles";
import { UserRepository } from "../../infrastructure/config/database/UserRepository";
import { DateHelper } from "../../shared/helpers/DateHelper";
import { LoginRequest } from "../model/requests/LoginRequest";
import { GenericResponse } from "../responses/GenericResponse";

export class loginUseCase{
  constructor(
    private readonly repository: UserRepository,
    private readonly jwt: JwtService
  ){}

  async verifica(data: LoginRequest): Promise<GenericResponse>{
    const token = this.jwt.generateToken({
      user_id: 0,
      first_name: "freddy",
      last_name: "barahona",
      email: data.email,
      password_hash: data.password,
      is_active: true,
      role: new Role
    })
    return formResponse(true, 200, ["endpoint procesado"], token)
  }
}