import { Router } from "express";
import { CategoryMakers } from "../../factories/category.makers";

export class CategoryRoutes{
  constructor(private readonly makers: CategoryMakers){}

  registrar_ruta(): Router{
    const router= Router()

    router.post("/:id", (req,res)=>{
      this.makers.instance().then(c=> c.create(req,res))
    })

    router.get("", (req,res)=>{
      this.makers.instance().then(c=> c.getAllCategories(req,res))
    })

    router.get("/:id", (req,res)=>{
      this.makers.instance().then(c=> c.getCategoryById(req,res))
    })

    router.put("/:id", (req,res)=>{
      this.makers.instance().then(c=> c.modifyCategoryById(req,res))
    })

    router.delete("/:id", (req,res)=>{
      this.makers.instance().then(c=> c.deleteCategoryById(req,res))
    })

    return router
  }
}