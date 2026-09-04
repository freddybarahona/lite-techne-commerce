import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity("InventoryHistories")
export class InventoryHistory{
  @PrimaryColumn({primaryKeyConstraintName: "INVENTORYHISTORY_id"})
  id!: number

  @Column({nullable: false})
  productId!: number

  @Column({nullable: false})
  movementType!: string

  @Column({nullable: false})
  quantity!: number

  @UpdateDateColumn()
  movementDate!: Date
}