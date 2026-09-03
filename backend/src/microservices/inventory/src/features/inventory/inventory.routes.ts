import { Request, Response, Router } from "express";
import { InventoryMakers } from "../../factories/inventory.makers";

export default class InventoryRoutes{
  private readonly router= Router()

  constructor(private readonly maker: InventoryMakers){}

  registrar_ruta(): Router{
    this.router.post("", this.createInventory.bind(this))
    this.router.get("", this.getAll.bind(this))
    this.router.get("/:product_id", this.getOne.bind(this))
    this.router.patch("/:product_id", this.modifyOne.bind(this))
    this.router.delete("/:product_id", this.deleteOne.bind(this))

    return this.router
  }

  private async createInventory(req: Request, res: Response){
    const controller=await this.maker.instance()
    const rsp = await controller.crearInventario(req)
    res.status(rsp.statusCode).json(rsp)
  }

  private async getAll(_req: Request, res: Response){
    const controller=await this.maker.instance()
    const rsp = await controller.obtener_inventario_completo()
    res.status(rsp.statusCode).json(rsp)
  }
  private async getOne(req: Request, res: Response ){
    const controller= await this.maker.instance()
    const rsp = await controller.obtener_miembro_id_inventario(req)
    res.status(rsp.statusCode).json(rsp)
  }

  private async modifyOne(req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp= await controller.modificar_stocks_inventario_id({req:req})
    res.status(rsp.statusCode).json(rsp)
  }

  private async deleteOne(req: Request, res: Response){
    const controller= await this.maker.instance()
    const rsp= await controller.soft_delete_inventario_id(req)
    res.status(rsp.statusCode).json(rsp)
  }

}

/* hay que investigar mas sobre .bind(this) ya que se ve muy util
Alternativas a .bind(this)
// Opción 1: Arrow function (captura this del closure)
this.router.get("", async (req, res) => this.getAll(req, res));

// Opción 2: Arrow function en la propiedad (el arrow function no tiene su propio this)
private getAll = async (_req: Request, res: Response) => {
  // this ya está capturado correctamente
}; */