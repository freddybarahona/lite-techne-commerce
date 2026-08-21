import { Router } from "express";
import { makeGetProfile, makeLogin } from "../../factories/authMakers";



const router = Router()

let getProfilecontroller = makeGetProfile()

router.get("/profile", async (req, res)=>{
  const rsp = await getProfilecontroller.ver(req)
  res.status(rsp.status).json(rsp.message)
})

const loginController = makeLogin()
router.post("/login", async (req, res) =>{
  const rsp = await loginController.iniciar(req)
  res.status(rsp.statusCode).json(rsp)
})

export default router