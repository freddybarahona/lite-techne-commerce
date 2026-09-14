import { Router } from "express";
import { ProductMakers } from "../../factories/product.makers";
import { Auth } from "../../../../shared/infrastructure/middlewares/auth.jwt";

export class ProductRoutes{
  constructor(
    private readonly makers: ProductMakers,
    private readonly auth: Auth
  ){}

  registrar_ruta(): Router{
    const router= Router()

    router.post("", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.create(req,res))
    })

    router.get("", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.getAllProducts(req,res))
    })

    router.get("/:id", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.getProductById(req,res))
    })

    router.put("/:id", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.modifyProductById(req,res))
    })

    router.delete("/:id", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.deleteProductById(req,res))
    })

    return router
  }
}