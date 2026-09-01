import { IsNotEmpty, IsNumber} from "class-validator";
import { ResponseConstants } from "../../../../../shared/constants/response.constants"
export class InventoryDTO{

  product_id!: number

  stock!: number

  reserved_stock!: number
  
  minimum_stock!: number
  
  last_movement!: Date
}