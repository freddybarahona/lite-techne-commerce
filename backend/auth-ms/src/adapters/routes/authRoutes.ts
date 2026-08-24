import { Router } from "express";
import { makeGetProfile, makeLogin } from "../../factories/authMakers";
import { Auth } from "../middlewares/Auth";



const router = Router()

const getProfilecontroller = makeGetProfile()

router.get("/profile", Auth.validate, async (req, res)=>{
  const rsp = await getProfilecontroller.ver(req)
  res.status(rsp.statusCode).json(rsp)
})

const loginController = makeLogin()
router.post("/login", async (req, res) =>{
  const rsp = await loginController.iniciar(req)
  res.status(rsp.statusCode).json(rsp)
})



export default router