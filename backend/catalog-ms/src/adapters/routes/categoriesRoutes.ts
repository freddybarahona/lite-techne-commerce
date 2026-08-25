import { Router } from "express";
import { makeCreateCategory } from "../../factories/categoryMakers";

const router = Router()

const createCategoryController = makeCreateCategory() 
router.post("", async(req, res)=>{
  const rsp= await createCategoryController.crear(req)
  res.status(rsp.statusCode).json(rsp)
})

export default router