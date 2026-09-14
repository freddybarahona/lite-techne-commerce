import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity("inventories")
@Unique("UQ_PRODUCT_ID", ['product_id']) 
export class Inventory{
  @PrimaryGeneratedColumn({primaryKeyConstraintName: "PK_INVENTORY"})
  inventory_id!: number
  
  @Column({})
  product_id!: number
  
  @Column()
  stock!: number
  
  @Column()
  reserved_stock!: number
  
  @Column()
  minimum_stock!: number
  
  @Column()
  last_movement!: Date
}
//el nodemon necesita reiniciarse para este tipo 
//de constraints porque sino no lo lee ya que 
//parece que se manteniene con los archivos viejos