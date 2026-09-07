import { IsIn, IsNotEmpty, IsNumber } from "class-validator";
import { ResponseConstants } from "../../../../shared/constants/response.constants"
import { MovementType } from "../../../../shared/types/shared.types"

export class CreateInventoryHistoryRequest{

  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "productId", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"productId"})})
  productId!: number

  @IsIn(["IN", "OUT"], {message: ResponseConstants.onlyTypes({campo: "movementType", type: "IN | OUT"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"movementType"})})
  movementType!: MovementType

  @IsNumber({},{message: ResponseConstants.onlyTypes({campo: "quantity", type: "enteros"}) })
  @IsNotEmpty({message: ResponseConstants.requiredSpace({campo:"quantity"})})
  quantity!: number
}
