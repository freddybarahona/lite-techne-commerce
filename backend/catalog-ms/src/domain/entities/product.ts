import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./category"

@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn({primaryKeyConstraintName: "PK-PRODUCT"})
  product_id!: number

  @Column({nullable: false, length: 100})
  name!: string

  @Column({nullable: false, length: 150})
  description!: string
  @Column({nullable: false, type: "decimal", scale: 2})
  price!: number

  @Column({nullable: false})
  is_active!: boolean

  @ManyToOne(() => Category, {nullable: false})
  @JoinColumn({name: "category_id", foreignKeyConstraintName: "FK_PRODUCT_CATEGORY"})
  category!: Category //se asocia un grupo a un solo ente 

  @CreateDateColumn({nullable: false})
  created_at!: Date

  @DeleteDateColumn({nullable: true})
  deleted_at!: Date
}

/*
Categorías
Electronics
Gaming
Monitors
Accessories */