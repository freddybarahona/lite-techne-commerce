import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { MovementType } from "../../../../shared/types/shared.types"
@Entity("InventoryHistories")
export class InventoryHistory{
  @PrimaryGeneratedColumn({primaryKeyConstraintName: "INVENTORYHISTORY_id"})
  id!: number

  @Column({nullable: false})
  productId!: number

  @Column({nullable: false, type: "varchar", length: 3})
  movementType!: MovementType

  @Column({nullable: false})
  quantity!: number

  @CreateDateColumn()
  movementDate!: Date
}