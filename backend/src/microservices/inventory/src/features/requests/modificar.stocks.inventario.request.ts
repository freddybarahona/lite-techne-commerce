import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { ResponseConstants } from "../../../../shared/constants/response.constants";

export class ModificarStocksInventarioRequest{
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "product_id", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"product_id"})})
  product_id!: number
  
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "stock", type: "enteros"}) })
  stock?: number
  
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "reserved", type: "enteros"}) })
  reserved_stock?: number
  
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "minimum", type: "enteros"}) })
  minimum_stock?: number
  
  @IsDate({message: ResponseConstants.onlyTypes({campo: "last_movement", type: "fecha"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"last_movement"})})
  last_movement!: Date

}