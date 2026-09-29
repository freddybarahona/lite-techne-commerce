import { Request, Response, Router } from "express";
import { CartMakers } from "../../factories/cart.makers";
import { Auth } from "../../../../shared/infrastructure/middlewares/auth.jwt";
import { validate } from "class-validator";

export default class CartRoutes{
  private readonly router= Router()

  constructor(
    private readonly maker: CartMakers,
    private readonly auth: Auth
  ){}

  registrar_ruta(): Router{
    this.router.post("", this.auth.validate, this.createCart.bind(this))
    this.router.patch("/:cart_id", this.auth.validate, this.modifyOne.bind(this))
    this.router.delete("/:cart_id", this.auth.validate, this.deleteOne.bind(this))
    this.router.get("", this.auth.validate, this.getOne.bind(this))

    return this.router
  }

  private async getOne(req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp = await controller.obtenerCart(req)
    res.status(rsp.statusCode).json(rsp)
  }

  private async createCart(req: Request, res: Response){
    const controller=await this.maker.instance()
    const rsp = await controller.crearCart(req)
    res.status(rsp.statusCode).json(rsp)
  }

  private async modifyOne(req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp= await controller.modificar_quantity_cart_id(req)
    res.status(rsp.statusCode).json(rsp)
  }

  private async deleteOne(req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp= await controller.borrar_cart_id(req)
    res.status(rsp.statusCode).json(rsp)
  }

}