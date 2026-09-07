import { ResponseConstants } from "../../../../shared/constants/response.constants";
import { formResponse } from "../../../../shared/responses/formResponse";
import GenericResponse from "../../../../shared/responses/GenericResponse";
import { CreateCategoryRequest } from "../requests/create.category.request";
import { ModifyCategoryByIdRequest } from "../requests/modify.category.by.id.request";
import { CategoryMapper } from "./category.mappers";
import { ICategoryRepository } from "./category.repository.interface";
import { CategoryDTO } from "../DTOs/category.DTO";
import { Category } from "../../domain/entities/category";

export class CategoryUseCases{
  private mapper= new CategoryMapper()

  constructor(
    private readonly repository: ICategoryRepository,
  ){}

  async createCategory({request_validado}:{request_validado: CreateCategoryRequest}): Promise<GenericResponse<CategoryDTO>>{
    const categoryNameExists= await this.repository.ifExistsCategoryByName({name: request_validado.name})
    if(categoryNameExists){
      return formResponse.create({success:false, statusCode:400, message:[ResponseConstants.CATEGORY_ALREADY_EXISTS]})
    }

    const entity= new Category()
    entity.category_id= request_validado.category_id
    entity.name= request_validado.name
    entity.description= request_validado.description

    const created= await this.repository.createCategory({entity})
    const dto= this.mapper.EntityToDTO({entity: created})
    return formResponse.create({success:true, statusCode:201, message:[ResponseConstants.entityCreatedCorrectly({entity:"categoria", creation_data: created.name})], dataDTO: dto})
  }

  async getAllCategories(): Promise<GenericResponse<CategoryDTO[]>>{
    const entities= await this.repository.getAllCategories()
    const dtoList= this.mapper.EntityListToDTOList({entityList: entities})

    if(!dtoList.length){
      return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.dbEmpty({entity:"Categories"})], dataDTO: []})
    }
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.dbFull({entity:"Categories", cant: dtoList.length})], dataDTO: dtoList})
  }

  async getCategoryById({category_id}:{category_id: number}): Promise<GenericResponse<CategoryDTO>>{
    const found= await this.repository.getCategoryById({id: category_id})
    if(!found){
      return formResponse.create({success:false, statusCode:404, message:[ResponseConstants.nothingLikeThatHere({entity:"Categoria", ind: category_id})]})
    }

    const dto= this.mapper.EntityToDTO({entity: found})
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.somethingFoundHere({element: found.name, ind: found.category_id, entity:"Categories"})], dataDTO: dto})
  }

  async modifyCategoryById({request_validado}:{request_validado: ModifyCategoryByIdRequest}): Promise<GenericResponse<CategoryDTO>>{
    const actual= await this.repository.getCategoryById({id: request_validado.category_id})
    if(!actual){
      return formResponse.create({success:false, statusCode:404, message:[ResponseConstants.nothingLikeThatHere({entity:"Categoria", ind: request_validado.category_id})]})
    }

    const name= request_validado.name ?? actual.name
    const description= request_validado.description ?? actual.description

    const entity= new Category()
    entity.category_id= request_validado.category_id
    entity.name= name
    entity.description= description

    const modified= await this.repository.modCategoryById({entity})
    const dto= this.mapper.EntityToDTO({entity: modified})
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.modifiedCorrectlyHere({name: modified.name, ind: modified.category_id, data:"Categories"})], dataDTO: dto})
  }

  async deleteCategoryById({category_id}:{category_id: number}): Promise<GenericResponse<any>>{
    const actual= await this.repository.getCategoryById({id: category_id})
    if(!actual){
      return formResponse.create({success:false, statusCode:404, message:[ResponseConstants.nothingLikeThatHere({entity:"Categoria", ind: category_id})]})
    }

    await this.repository.deleteCategory({id: category_id})
    return formResponse.create({success:true, statusCode:200, message:[ResponseConstants.ERASED_ELEMENT]})
  }
}