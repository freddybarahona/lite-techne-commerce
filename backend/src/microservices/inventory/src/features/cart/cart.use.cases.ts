import { CartDTO } from "../DTOs/cart.DTO";
import { formResponse } from "../../../../shared/responses/formResponse";
import GenericResponse from "../../../../shared/responses/GenericResponse";
import { ICartRepository } from "./cart.repository.interface";
import { CreateCartRequest } from "../requests/create.cart.request";
import { ValidatorHelper } from "../../../../shared/helpers/validator.helper"
import { ResponseConstants } from "../../../../shared/constants/response.constants";
import { CartMapper } from "./cart.mappers";
import { DeleteCartRequest } from "../requests/delete.cart.request";
import { UpdateCartRequest } from "../requests/update.cart.request";

export class CartUseCases{
  constructor(private readonly repository: ICartRepository){}

  async verificacionObtenerCart({customer_id}:{customer_id: number}): Promise<GenericResponse<CartDTO[] | null>>{
    const errors: string[]= []
    const carts= await this.repository.getCartByCustomerId({id: customer_id})
    if(carts == null) errors.push(ResponseConstants.dbEmpty({entity:"cart data"}))
    if(errors.length < 0) return formResponse.create({success: false, statusCode: 400, message: errors})

    const DTO: CartDTO[]=[]
    for (const cart of carts!) {
      const process= CartMapper.mapDTO({entity:cart})
      DTO.push(process)
    }

    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.dbFull({cant: DTO.length, entity: 'cart data'})], dataDTO: DTO})
  }

  async verificacionCreacionCart({request_validado, customer_id}:{request_validado: CreateCartRequest, customer_id: number}): Promise<GenericResponse<CartDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: request_validado})
    console.log("errores: ", errors)

    if(errors.length > 0){
      return formResponse.create({success: false, statusCode: 400, message: errors})
    }

    const actual_cart= CartMapper.mapEnt({request: request_validado, customer_id: customer_id})

    const repo_result= await this.repository.createCart({entity: actual_cart})

    const DTO= CartMapper.mapDTO({entity: repo_result})

    return formResponse.create({ success: true, statusCode: 201, message: [ResponseConstants.entityCreatedCorrectly({entity:"cart", creation_data: repo_result.cart_id })], dataDTO: DTO })
  }

  async verificacion_modificacion_quantity_cart_id({request_data}:{request_data: UpdateCartRequest}): Promise<GenericResponse<CartDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: request_data})
    console.log(errors)
    const exists= await this.repository.getCartById({id: request_data.cart_id})

    if(exists == null)
      errors.push(ResponseConstants.nothingLikeThatHere({entity: "cart",ind: request_data.cart_id}))

    if(errors.length > 0)
      return formResponse.create({success: false, statusCode: 400, message: errors})

    exists!.quantity= request_data.quantity!
    console.log(exists)

    const repo_result= await this.repository.updateCart({entity: exists!})

    const cartDTO= CartMapper.mapDTO({entity: repo_result})
    return formResponse.create({success: true, statusCode: 200, message: [ResponseConstants.modifiedCorrectlyHere({name:"cart",data:"cart",ind:repo_result.cart_id})], dataDTO: cartDTO})
  }

  async verificacion_borrado_fisico_cart_id({request_data}:{request_data: DeleteCartRequest}): Promise<GenericResponse<CartDTO | null>>{
    const errors: string[]= await ValidatorHelper.getErrors({request: request_data})
    console.log(errors)
    const exists= await this.repository.getCartById({id: request_data.cart_id})

    if(exists == null)
      errors.push(ResponseConstants.nothingLikeThatHere({entity: "cart",ind: request_data.cart_id}))

    if(errors.length > 0)
      return formResponse.create({success: false, statusCode: 400, message: errors})

    const repo_result= await this.repository.deleteCart({id: request_data.cart_id})

    const cartDTO= CartMapper.mapDTO({entity: exists!})
    return formResponse.create({success: repo_result, statusCode: 200, message: [ResponseConstants.ERASED_ELEMENT], dataDTO: cartDTO})
  }
}