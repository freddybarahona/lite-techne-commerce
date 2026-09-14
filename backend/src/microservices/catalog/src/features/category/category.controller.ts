import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { ValidatorHelper } from "../../../../shared/helpers/validator.helper";
import { formResponse } from "../../../../shared/responses/formResponse";
import { CategoryUseCases } from "./category.use.cases";
import { CreateCategoryRequest } from "../requests/create.category.request";
import { ModifyCategoryByIdRequest } from "../requests/modify.category.by.id.request";

export class CategoryControllers{
  constructor(private readonly useCase: CategoryUseCases){}

  async create(req: Request, res: Response){
    const request_validado= plainToInstance(CreateCategoryRequest, {
      category_id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
    })
    const errors= await ValidatorHelper.getErrors({request: request_validado})
    if(errors.length){
      return res.status(400).json(formResponse.create({success:false, statusCode:400, message: errors}))
    }

    const response= await this.useCase.createCategory({request_validado})
    return res.status(response.statusCode).json(response)
  }

  async getAllCategories(req: Request, res: Response){
    const response= await this.useCase.getAllCategories()
    return res.status(response.statusCode).json(response)
  }

  async getCategoryById(req: Request, res: Response){
    const response= await this.useCase.getCategoryById({category_id: Number(req.params.id)})
    return res.status(response.statusCode).json(response)
  }

  async modifyCategoryById(req: Request, res: Response){
    const request_validado= plainToInstance(ModifyCategoryByIdRequest, {
      category_id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
    })
    const errors= await ValidatorHelper.getErrors({request: request_validado})
    if(errors.length){
      return res.status(400).json(formResponse.create({success:false, statusCode:400, message: errors}))
    }

    const response= await this.useCase.modifyCategoryById({request_validado})
    return res.status(response.statusCode).json(response)
  }

  async deleteCategoryById(req: Request, res: Response){
    const response= await this.useCase.deleteCategoryById({category_id: Number(req.params.id)})
    return res.status(response.statusCode).json(response)
  }
}