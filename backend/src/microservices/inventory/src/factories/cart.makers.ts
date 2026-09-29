import { Cart } from "../domain/entities/cart";
import { CartControllers } from "../features/cart/cart.controller";
import { CartRepository } from "../features/cart/cart.repository";
import { CartUseCases } from "../features/cart/cart.use.cases";
import AppDataSource from "../infrastructure/config/database/data.source";
import { Environment } from "../core/config/env/env";

export class CartMakers{
  constructor(
    private readonly env: Environment,
  ){}
  private async refreshingSourceandRepo(){
    const source= new AppDataSource().create_get_instance()
    const cartRepo= source.getRepository(Cart)
    return new CartRepository(cartRepo)
  }

  async instance(): Promise<CartControllers>{
    const useCase = new CartUseCases(await this.refreshingSourceandRepo())
    return new CartControllers(useCase)
  }
}