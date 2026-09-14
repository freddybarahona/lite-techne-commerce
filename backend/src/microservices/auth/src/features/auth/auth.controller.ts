import { Request, Response } from "express"
import { plainToInstance } from "class-transformer"
import { ValidatorHelper } from "../../../../shared/helpers/validator.helper"
import { formResponse } from "../../../../shared/responses/formResponse"
import { AuthUseCases } from "./auth.use.cases"
import { LoginRequest } from "../requests/login.request"
import { RegisterUserRequest } from "../requests/register.user.request"
import { GetProfileRequest } from "../requests/get.profile.request"

export class AuthControllers{
  constructor(private readonly useCase: AuthUseCases){}

  async login(req: Request, res: Response){
    const request_validado= plainToInstance(LoginRequest, {
      email: req.body.email,
      password: req.body.password,
    })
    const errors= await ValidatorHelper.getErrors({request: request_validado})
    if(errors.length){
      return res.status(400).json(formResponse.create({success: false, statusCode: 400, message: errors}))
    }

    const response= await this.useCase.login({request_validado})
    return res.status(response.statusCode).json(response)
  }

  async register(req: Request, res: Response){
    const request_validado= plainToInstance(RegisterUserRequest, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role_id,
    })
    const errors= await ValidatorHelper.getErrors({request: request_validado})
    if(errors.length){
      return res.status(400).json(formResponse.create({success: false, statusCode: 400, message: errors}))
    }

    const response= await this.useCase.register({request_validado})
    return res.status(response.statusCode).json(response)
  }

  async getProfile(req: Request, res: Response){
    const request_validado= plainToInstance(GetProfileRequest, {
      email: (req as any).user?.email,
    })
    const errors= await ValidatorHelper.getErrors({request: request_validado})
    if(errors.length){
      return res.status(400).json(formResponse.create({success: false, statusCode: 400, message: errors}))
    }

    const response= await this.useCase.getProfile({request_validado})
    return res.status(response.statusCode).json(response)
  }
}