import { CreateInventoryRequest } from "./requests/create.request"

export class InventoryControllers{
  constructor(private readonly useCase: InventoryUseCases){}

  async crear(req: Request){
    const row= Object.assign(new CreateInventoryRequest, )
  }

  private mapRequest<T>(data:Request): T{
    return{

    }
  }
}