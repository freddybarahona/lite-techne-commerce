import { IsNotEmpty, IsNumber } from "class-validator";
import { ResponseConstants } from "../../../../shared/constants/response.constants";

export class DeleteCartRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"cart_id"})})
  @IsNumber({}, {message: ResponseConstants.onlyTypes({campo:"cart_id" , type:"numero"})})
  cart_id!: number
}