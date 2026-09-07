import { Router } from "express";
import { ProductMakers } from "../../factories/product.makers";

export class ProductRoutes{
  constructor(private readonly makers: ProductMakers){}

  registrar_ruta(): Router{
    const router= Router()

    router.post("", (req,res)=>{
      this.makers.instance().then(c=> c.create(req,res))
    })

    router.get("", (req,res)=>{
      this.makers.instance().then(c=> c.getAllProducts(req,res))
    })

    router.get("/:id", (req,res)=>{
      this.makers.instance().then(c=> c.getProductById(req,res))
    })

    router.put("/:id", (req,res)=>{
      this.makers.instance().then(c=> c.modifyProductById(req,res))
    })

    router.delete("/:id", (req,res)=>{
      this.makers.instance().then(c=> c.deleteProductById(req,res))
    })

    return router
  }
}