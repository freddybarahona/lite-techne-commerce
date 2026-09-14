import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"

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

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at!: Date
}
//el nodemon necesita reiniciarse para este tipo 
//de constraints porque sino no lo lee ya que 
//parece que se manteniene con los archivos viejos