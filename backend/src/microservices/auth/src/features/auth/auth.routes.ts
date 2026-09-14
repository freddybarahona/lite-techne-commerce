import { Request, Response, Router } from "express"
import { AuthMakers } from "../../factories/auth.makers"
import { Auth } from "../../infrastructure/middlewares/auth.jwt"
import { Environment } from "../../core/config/env/env"

export class AuthRoutes{
  constructor(
    private readonly makers: AuthMakers,
    private readonly env: Environment
  ){}

  registrar_ruta(): Router{
    const router= Router()
    const authJwt= new Auth(this.env)

    router.post("/register", (req: Request, res: Response)=>{
      this.makers.instance().then(c=> c.register(req,res))
    })

    router.post("/login", (req: Request, res: Response)=>{
      this.makers.instance().then(c=> c.login(req,res))
    })

    router.get("/profile", authJwt.validate, (req: Request, res: Response)=>{
      this.makers.instance().then(c=> c.getProfile(req,res))
    })

    return router
  }
}