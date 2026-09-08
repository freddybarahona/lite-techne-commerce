import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Environment } from "../../core/config/env/env"
import { ResponseConstants } from "../../../../shared/constants/response.constants"
import { formResponse } from "../../../../shared/responses/formResponse"

export class Auth{
  constructor(private readonly env: Environment){}

  validate= (req: Request, res: Response, next: NextFunction): void | Response => {
    const authHeader = req.headers.authorization
    if(!authHeader){
      const rsp= formResponse.create({success: false, statusCode: 401, message: [ResponseConstants.USER_TOKEN_INVALID]})
      return res.status(rsp.statusCode).json(rsp)
    }
    const token = authHeader.split(" ")[1]
    try{
      const payload = jwt.verify(token, this.env.jwt_secret) as {
        id: number
        email: string
        role: string
        name: string
      }
      ;(req as any).user = payload
      next()
    }catch{
      const rsp= formResponse.create({success: false, statusCode: 401, message: [ResponseConstants.USER_TOKEN_INVALID]})
      return res.status(rsp.statusCode).json(rsp)
    }
  }
}