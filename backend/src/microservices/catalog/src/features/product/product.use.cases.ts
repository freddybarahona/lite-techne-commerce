import { ResponseConstants } from "../../../../shared/constants/response.constants";
import { formResponse } from "../../../../shared/responses/formResponse";
import GenericResponse from "../../../../shared/responses/GenericResponse";
import { CreateProductRequest } from "../requests/create.product.request";
import { ModifyProductByIdRequest } from "../requests/modify.product.by.id.request";
import { ProductMapper } from "./product.mappers";
import { IProductRepository } from "./product.repository.interface";
import { ICategoryRepository } from "../category/category.repository.interface";
import { ProductDTO } from "../DTOs/product.DTO";
import { Product } from "../../domain/entities/product";
import { Category } from "../../domain/entities/category";

export class ProductUseCases{
  private mapper= new ProductMapper()

  constructor(
    private readonly repository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ){}

  async createProduct({request_validado}:{request_validado: CreateProductRequest}): Promise<GenericResponse<ProductDTO>>{
    const categoryExists= await this.categoryRepository.getCategoryById({id: request_validado.category_id})
    if(!categoryExists){
      return formResponse.create({success:false, statusCode:404, message:[ResponseConstants.nothingLikeThatHere({entity:"categoria", ind: request_validado.category_id})]})
    }

    const productNameExists= await this.repository.ifExistsProductByName({name: request_validado.name})
    if(productNameExists){
      return formResponse.create({success:false, statusCode:400, message:[ResponseConstants.PRODUCT_ALREADY_EXISTS]})
    }

    const entity= new Product()
    entity.name= request_validado.name
    entity.description= request_validado.description
    entity.price= request_validado.price
    entity.is_active= true
    entity.category= {category_id: request_validado.category_id} as Category

    const created= await this.repository.createProduct({entity})
    const dto= this.mapper.EntityToDTO({entity: created})
    return formResponse.create({success:true, statusCode:201, message:[ResponseConstants.entityCreatedCorrectly({entity:"producto", creation_data: created.name})], dataDTO: dto})
  }

  async getAllProducts(): Promise<GenericResponse<ProductDTO[]>>{
    const entities= await this.repository.getAllProducts()
    const dtoList= this.mapper.EntityListToDTOList({entityList: entities})

    if(!dtoList.length){
      return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.dbEmpty({entity:"Products"})], dataDTO: []})
    }
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.dbFull({entity:"Products", cant: dtoList.length})], dataDTO: dtoList})
  }

  async getProductById({product_id}:{product_id: number}): Promise<GenericResponse<ProductDTO>>{
    const found= await this.repository.getProductById({id: product_id})
    if(!found){
      return formResponse.create({success:false, statusCode:404, message:[ResponseConstants.nothingLikeThatHere({entity:"Producto", ind: product_id})]})
    }

    const dto= this.mapper.EntityToDTO({entity: found})
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.somethingFoundHere({element: found.name, ind: found.product_id, entity:"Products"})], dataDTO: dto})
  }

  async modifyProductById({request_validado}:{request_validado: ModifyProductByIdRequest}): Promise<GenericResponse<ProductDTO>>{
    const actual= await this.repository.getProductById({id: request_validado.product_id})
    if(!actual){
      return formResponse.create({success:false, statusCode:404, message:[ResponseConstants.nothingLikeThatHere({entity:"Producto", ind: request_validado.product_id})]})
    }

    const name= request_validado.name ?? actual.name
    const description= request_validado.description ?? actual.description
    const price= request_validado.price ?? actual.price
    const is_active= request_validado.is_active ?? actual.is_active
    const category_id= request_validado.category_id ?? actual.category.category_id

    const entity= new Product()
    entity.product_id= request_validado.product_id
    entity.name= name
    entity.description= description
    entity.price= price
    entity.is_active= is_active
    entity.category= {category_id: category_id} as Category

    const modified= await this.repository.modProductById({entity})
    const dto= this.mapper.EntityToDTO({entity: modified})
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.modifiedCorrectlyHere({name: modified.name, ind: modified.product_id, data:"Products"})], dataDTO: dto})
  }

  async deleteProductById({product_id}:{product_id: number}): Promise<GenericResponse<any>>{
    const actual= await this.repository.getProductById({id: product_id})
    if(!actual){
      return formResponse.create({success:false, statusCode:404, message:[ResponseConstants.nothingLikeThatHere({entity:"Producto", ind: product_id})]})
    }

    await this.repository.deleteProduct({id: product_id})
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.ERASED_ELEMENT]})
  }
}