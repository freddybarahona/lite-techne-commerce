import { User } from "../../../domain/entities/users";
import { AppDataSource } from "./DataSource";
export class UserRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
        this.repository = AppDataSource.getRepository(User);
    }
    async ifExistsName(data) {
        const result = await this.repository.existsBy({ first_name: data })
            ? true : this.repository.existsBy({ last_name: data });
        return result;
    }
    async ifExistsID(data) {
        return await this.repository.existsBy({ user_id: data });
    }
}
