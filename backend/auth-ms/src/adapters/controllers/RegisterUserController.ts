import { Request } from "express";
import { RegisterUserRequest } from "../../application/model/requests/RegisterUserRequest";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";

export class RegisterUserController{
  constructor(private readonly useCase: RegisterUserUseCase){}

  async registrar(req: Request){
    const row: RegisterUserRequest={
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password_hash: req.body.password,
      is_active: null,
      role: req.body.role_id,
    }
    const rsp= await this.useCase.verifica(row)
    return rsp
  }
}