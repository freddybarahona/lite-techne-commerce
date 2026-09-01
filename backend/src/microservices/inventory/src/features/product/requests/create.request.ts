import { IsNotEmpty, IsNumber} from "class-validator";
import { ResponseConstants } from "../../../../../shared/constants/response.constants"
export class CreateInventoryRequest{

  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "product_id", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"product_id"})})
  product_id!: number

  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "stock", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"stock"})})
  stock!: number

  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "reserved_stock", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"reserved_stock"})})
  reserved_stock!: number
  
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "minimum_stock", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"minimum_stock"})})
  minimum_stock!: number
  
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "last_movement", type: "fecha"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"last_movement"})})
  last_movement!: Date
}