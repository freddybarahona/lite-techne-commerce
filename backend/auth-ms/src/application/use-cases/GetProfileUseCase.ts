import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class GetProfileUseCase{
  constructor(private readonly repository: IUserRepository){}
  
  async verifica(data: string)/* : Promise<GenericResponse> */{

    const rsp = await this.repository.ifExistsName(data)? {status: 200, message: "se encontro"} : {status: 400, message: "no se logro"}
    return rsp
  }
}