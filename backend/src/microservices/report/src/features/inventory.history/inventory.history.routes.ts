import { Request, Response, Router } from "express";
import { InventoryHistoryMakers } from "../../factories/inventory.history.makers";

export default class InventoryHistoryRoutes{
  private readonly router= Router()

  constructor(private readonly maker: InventoryHistoryMakers){}

  registrar_ruta(): Router{
    this.router.post("", this.registrarMovimiento.bind(this))
    this.router.get("", this.obtenerTodo.bind(this))
    this.router.get("/:productId", this.obtenerPorProducto.bind(this))

    return this.router
  }

  private async registrarMovimiento(req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp= await controller.registrarMovimiento(req)
    res.status(rsp.statusCode).json(rsp)
  }

  private async obtenerTodo(_req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp= await controller.obtenerTodoElHistorial()
    res.status(rsp.statusCode).json(rsp)
  }

  private async obtenerPorProducto(req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp= await controller.obtenerHistorialPorProducto(req)
    res.status(rsp.statusCode).json(rsp)
  }
}
