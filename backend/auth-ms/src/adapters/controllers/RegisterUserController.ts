import { Request } from "express";
import { RegisterUserRequest } from "../../application/model/requests/RegisterUserRequest";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";

export class RegisterUserController{
  constructor(private readonly useCase: RegisterUserUseCase){}

  async registrar(req: Request){
    const row= Object.assign(new RegisterUserRequest(), this.mapRequest(req))
    const rsp= await this.useCase.verifica(row)
    return rsp
  }

  private mapRequest(req: Request): RegisterUserRequest{
    return {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role_id
    }
  }
}
// Solo al crear una instancia de RegisterUserRequest se pueden leer
// correctamente los decoradores de class-validator.

// Object.assign copia las propiedades del segundo objeto
// dentro de la instancia creada como primer argumento.