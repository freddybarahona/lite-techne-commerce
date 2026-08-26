import { Router } from "express";
import { makeCreateCategory, makeDeleteCategory, makeGetCategories, makeGetCategoryById, makeModifyCategoryById } from "../../factories/categoryMakers";

const router = Router()

const createCategoryController = makeCreateCategory() 
router.post("/:id", async(req, res)=>{
  const rsp= await createCategoryController.crear(req)
  res.status(rsp.statusCode).json(rsp)
})


const getCategoriesController = makeGetCategories()
router.get("", async(req, res)=>{
  const rsp= await getCategoriesController.obtener()
  res.status(rsp.statusCode).json(rsp)
})

const getCategoryByIdController = makeGetCategoryById()
router.get("/:id", async(req, res)=>{
  const rsp= await getCategoryByIdController.obtener(req)
  res.status(rsp.statusCode).json(rsp)
}) 

const modifyCategoryByIdController = makeModifyCategoryById()
router.put("/:id", async(req, res) =>{
  const rsp= await modifyCategoryByIdController.modifica(req)
  res.status(rsp.statusCode).json(rsp)
})

const deleteCategoryController = makeDeleteCategory()
router.delete("/:id", async(req, res)=>{
  const rsp= await deleteCategoryController.borra(req)
  res.status(rsp.statusCode).json(rsp)
})


export default router