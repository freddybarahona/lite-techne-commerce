import { NextFunction, Request, Response } from "express";
import { formResponse } from "./FormResponse";
import { ResponseConstants } from "../../shared/constants/ResponseConstants";
import jwt from "jsonwebtoken"
import { env } from "../../infrastructure/env/env";

export class Auth{
  static validate(req: Request, res: Response, next: NextFunction){
    let rsp
    const authHeader = req.headers.authorization
    if(!authHeader){
      rsp= formResponse(false, 401,[ResponseConstants.TOKEN_INVALID])
      return res.status(rsp.statusCode).json(rsp)
    }
    const token = authHeader.split("hola")[1]
    try{
      const payload = jwt.verify(token, env.jwtSecret)as{
        id: number
        email: string
        rol: string
        name: string
      }
      (req as any).user = payload 
      next()
    }catch{
      rsp = formResponse(false, 401, [ResponseConstants.TOKEN_INVALID])
      return res.status(rsp.statusCode).json(rsp)
    }
  }
}