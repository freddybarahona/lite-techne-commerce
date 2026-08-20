export class GetProfileUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async verifica(data) {
        const rsp = await this.repository.ifExistsName(data) ? { status: 200, message: "se encontro" } : { status: 400, message: "no se logro" };
        return rsp;
    }
}
