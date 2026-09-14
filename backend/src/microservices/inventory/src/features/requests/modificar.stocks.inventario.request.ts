import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ResponseConstants } from "../../../../shared/constants/response.constants";
import { IsNull } from "typeorm";

export class ModificarStocksInventarioRequest{
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "product_id", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"product_id"})})
  product_id!: number
  
  @IsOptional()
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "stock", type: "enteros"}) })
  stock?: number
  
  @IsOptional({})
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "reserved", type: "enteros"}) })
  reserved_stock?: number
  
  @IsOptional()
  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "minimum", type: "enteros"}) })
  minimum_stock?: number
  
  @IsDate({message: ResponseConstants.onlyTypes({campo: "last_movement", type: "fecha"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"last_movement"})})
  last_movement!: Date

}

/* el @IsOptional opaca todas las validaciones por debajo de el para ese campo y devuleve undefined
de manera que acepta valores 
explicacion openCode:
Qué hace @IsOptional() en class-validator
@IsOptional() sí acepta ambos: undefined Y null. Si el valor es cualquiera de los dos, class-validator salta la validación de ese campo.
@IsOptional()
@IsNumber({})
stock?: number

Escenario	req.body	Tipo
Campo omitido en Postman	{ "stock": 10 }	undefined
Campo con valor null	{ "stock": 10, "reserved": null }	null
Campo con valor vacío (string)	{ "stock": 10, "reserved": "" }	"" (string)
*/