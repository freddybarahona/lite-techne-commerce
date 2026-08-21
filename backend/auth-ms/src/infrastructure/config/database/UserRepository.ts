import { Repository } from "typeorm";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/users";
import { AppDataSource } from "./DataSource";


export class UserRepository implements IUserRepository{
  
  constructor(private repository: Repository<User>){
    this.repository = AppDataSource.getRepository(User)
  }
  async findByEmail(data: string): Promise<User | null> {
    const result = await this.repository.findOneBy({email: data})
    return result
  }
  
  async ifExistsName(data: string): Promise<Boolean> {
    const result= await this.repository.existsBy({first_name: data})
      ? true : this.repository.existsBy({last_name: data})
    return result
  }
  async ifExistsID(data: number): Promise<Boolean> {
    return await this.repository.existsBy({user_id: data})
  }
}