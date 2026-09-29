import { IsNotEmpty, IsNumber } from "class-validator";
import { ResponseConstants } from "../../../../shared/constants/response.constants";

export class SoftDeleteInventarioRequest{
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"product_id"})})
  @IsNumber({}, {message: ResponseConstants.onlyTypes({campo:"product_id" , type:"numero"})})
  product_id!: number
}