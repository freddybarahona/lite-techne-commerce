import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { ValidatorHelper } from "../../../../shared/helpers/validator.helper";
import { formResponse } from "../../../../shared/responses/formResponse";
import { ProductUseCases } from "./product.use.cases";
import { CreateProductRequest } from "../requests/create.product.request";
import { ModifyProductByIdRequest } from "../requests/modify.product.by.id.request";

export class ProductControllers{
  constructor(private readonly useCase: ProductUseCases){}

  async create(req: Request, res: Response){
    const request_validado= plainToInstance(CreateProductRequest, req.body)
    const errors= await ValidatorHelper.getErrors({request: request_validado})
    if(errors.length){
      return res.status(400).json(formResponse.create({success:false, statusCode:400, message: errors}))
    }

    const response= await this.useCase.createProduct({request_validado})
    return res.status(response.statusCode).json(response)
  }

  async getAllProducts(req: Request, res: Response){
    const response= await this.useCase.getAllProducts()
    return res.status(response.statusCode).json(response)
  }

  async getProductById(req: Request, res: Response){
    const response= await this.useCase.getProductById({product_id: Number(req.params.id)})
    return res.status(response.statusCode).json(response)
  }

  async modifyProductById(req: Request, res: Response){
    const request_validado= plainToInstance(ModifyProductByIdRequest, {
      product_id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      is_active: req.body.active,
      category_id: req.body.cat_id,
    })
    const errors= await ValidatorHelper.getErrors({request: request_validado})
    if(errors.length){
      return res.status(400).json(formResponse.create({success:false, statusCode:400, message: errors}))
    }

    const response= await this.useCase.modifyProductById({request_validado})
    return res.status(response.statusCode).json(response)
  }

  async deleteProductById(req: Request, res: Response){
    const response= await this.useCase.deleteProductById({product_id: Number(req.params.id)})
    return res.status(response.statusCode).json(response)
  }
}