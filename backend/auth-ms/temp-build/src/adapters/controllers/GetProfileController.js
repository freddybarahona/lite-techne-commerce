export class GetProfileController {
    useCase;
    constructor(useCase) {
        this.useCase = useCase;
    }
    async ver(req) {
        const nombre = String(req.body.nombre);
        const rsp = await this.useCase.verifica(nombre);
        return rsp;
    }
}
