import { Router } from "express";
import { makeCreateCategory, makeGetCategories } from "../../factories/categoryMakers";

const router = Router()

const createCategoryController = makeCreateCategory() 
router.post("", async(req, res)=>{
  const rsp= await createCategoryController.crear(req)
  res.status(rsp.statusCode).json(rsp)
})


const getCategoriesController = makeGetCategories()
router.get("", async(req, res)=>{
  const rsp= await getCategoriesController.obtener()
  res.status(rsp.statusCode).json(rsp)
})


export default router