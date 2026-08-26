import { Router } from "express";
import { makeCreateProduct } from "../../factories/productMakers";


const router = Router()

const createProductController = makeCreateProduct() 
router.post("", async(req, res)=>{
  const rsp= await createProductController.crear(req)
  res.status(rsp.statusCode).json(rsp)
})


export default router