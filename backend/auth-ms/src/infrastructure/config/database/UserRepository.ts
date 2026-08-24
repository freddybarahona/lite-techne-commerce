import { Repository } from "typeorm";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/users";
import { AppDataSource } from "./DataSource";
import { RegisterUserRequest } from "../../../application/model/requests/RegisterUserRequest";


export class UserRepository implements IUserRepository{
  
  constructor(private repository: Repository<User>){
    this.repository = AppDataSource.getRepository(User)
  }
  async IfExistsEmail(data: string): Promise<boolean> {
    const result = await this.repository.existsBy({email: data})
    return result
  }
  async createUser(data: Omit<User, "user_id" | "created_at" | "updated_at">): Promise<User> {
    const result = await this.repository.save(await this.repository.create(data))
    return result
  }
  async findByEmail(data: string): Promise<User | null> {
    const result = await this.repository.findOne({where:{email: data},relations: {role: true}})
    return result
  }
  //ojo typeorm al momento de consultas no carga las 
  //relaciones automaticamente sino que en el repo se 
  //las debe pedir manualmente 
  
  async ifExistsName(data: string): Promise<boolean> {
    const result= await this.repository.existsBy({first_name: data})
      ? true : this.repository.existsBy({last_name: data})
    return result
  }
  async ifExistsID(data: number): Promise<boolean> {
    return await this.repository.existsBy({user_id: data})
  }
}