import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ResponseConstants } from "../../../../shared/constants/response.constants";

export class UpdateCartRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"cart_id"})})
  @IsNumber({}, {message: ResponseConstants.onlyTypes({campo:"cart_id" , type:"numero"})})
  cart_id!: number

  @IsOptional()
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "quantity", type: "enteros"}) })
  quantity?: number
}