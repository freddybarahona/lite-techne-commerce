import { NextFunction, Request, Response } from "express"
import { HandlerParams } from "../types/shared.types"

/* 
export class Handlers{
  validate(params: HandlerParams) {
    return (req: Request, res: Response, next: NextFunction) =>{
      params(req, res).catch(next)
    }
  }
} */

/* export const asyncHandler = (handler: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction)=> {
    handler(req, res).catch(next)
  }
} */