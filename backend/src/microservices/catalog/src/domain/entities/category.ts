import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Product } from "./product"


@Entity("Categories")
export class Category{
  @PrimaryColumn({primaryKeyConstraintName: "PK_CATEGORY"})
  category_id!: number
  
  @Column({length:50, nullable:false})
  name!: string

  @Column({length: 100, nullable: false})
  description!: string 
  
  @CreateDateColumn({nullable: false})
  created_at!: Date

  @DeleteDateColumn({nullable: true})
  deleted_at!: Date

  @OneToMany(() => Product, product => product.category)
  product!: Product[] //una se asocia a un grupo de usuarios
}