import { Request } from "express";
import { LoginRequest } from "../../application/model/requests/LoginRequest";
import { loginUseCase } from "../../application/use-cases/LoginUseCase";

export class LoginController{
  constructor(private readonly useCase: loginUseCase){}

  async iniciar(req: Request){
    const row: LoginRequest={
      email: req.body.email,
      password: req.body.password
    } 
    return await this.useCase.verifica(row)
  }
}