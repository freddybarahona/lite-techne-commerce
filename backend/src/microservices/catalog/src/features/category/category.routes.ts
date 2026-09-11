import { Router } from "express";
import { CategoryMakers } from "../../factories/category.makers";
import { Auth } from "../../../../shared/infrastructure/middlewares/auth.jwt";

export class CategoryRoutes{
  constructor(
    private readonly makers: CategoryMakers,
    private readonly auth: Auth
  ){}

  registrar_ruta(): Router{
    const router= Router()

    router.post("/:id", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.create(req,res))
    })

    router.get("", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.getAllCategories(req,res))
    })

    router.get("/:id", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.getCategoryById(req,res))
    })

    router.put("/:id", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.modifyCategoryById(req,res))
    })

    router.delete("/:id", this.auth.validate, (req,res)=>{
      this.makers.instance().then(c=> c.deleteCategoryById(req,res))
    })

    return router
  }
}