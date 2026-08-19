import { Router } from "express";


const router = Router()

router.get("/get", (_req, res)=>{
  res.status(200).json({message: "el microservicio esta corriendo"})
})

export default router