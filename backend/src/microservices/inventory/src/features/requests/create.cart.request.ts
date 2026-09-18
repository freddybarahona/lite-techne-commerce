import { IsNotEmpty, IsNumber } from "class-validator";
import { ResponseConstants } from "../../../../shared/constants/response.constants";

export class CreateCartRequest{

  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "product_id", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"product_id"})})
  product_id!: number

  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "quantity", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"quantity"})})
  quantity!: number
}