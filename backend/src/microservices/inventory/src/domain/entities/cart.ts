import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("carts")
export class Cart{
  @PrimaryGeneratedColumn({primaryKeyConstraintName: "PK_CART"})
  cart_id!: number

  @Column()
  customer_id!: number

  @Column()
  product_id!: number

  @Column()
  quantity!: number

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date
}