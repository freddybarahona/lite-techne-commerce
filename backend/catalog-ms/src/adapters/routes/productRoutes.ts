import { Router } from "express";
import { makeCreateProduct, makeDeleteProduct, makeGetProductById, makeGetProducts, makeModifyProductById } from "../../factories/productMakers";


const router = Router()

const createProductController = makeCreateProduct() 
router.post("", async(req, res)=>{
  const rsp= await createProductController.crear(req)
  res.status(rsp.statusCode).json(rsp)
})

const getProductController = makeGetProducts()
router.get("", async(req, res)=>{
  const rsp= await getProductController.obtener()
  res.status(rsp.statusCode).json(rsp)
})

const getProductByIdController = makeGetProductById()
router.get("/:id", async(req, res)=>{
  const rsp= await getProductByIdController.obtener(req)
  res.status(rsp.statusCode).json(rsp)
}) 

const modifyProductByIdController = makeModifyProductById()
router.put("/:id", async(req, res) =>{
  const rsp= await modifyProductByIdController.modifica(req)
  res.status(rsp.statusCode).json(rsp)
})

const deleteProductController = makeDeleteProduct()
router.delete("/:id", async(req, res)=>{
  const rsp= await deleteProductController.borra(req)
  res.status(rsp.statusCode).json(rsp)
})

export default router