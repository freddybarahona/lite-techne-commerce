import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Role } from "./roles";

@Entity("users")
@Unique("UQ_USERS_EMAIL", ["email"]) //forma para poner las keys en typeorm con nombre
export class User{
  @PrimaryGeneratedColumn({primaryKeyConstraintName: "PK_USERS"})
  user_id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ nullable: false })
  email!: string;

  @Column()
  password_hash!: string;

  @ManyToOne(() => Role, {nullable: false})
  @JoinColumn({name: "role_id", foreignKeyConstraintName: "FK_USERS_ROLES"})
  role!: Role;

  @Column()
  is_active!: boolean;

  @CreateDateColumn({ nullable: false })
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

// CUSTOMER | SELLER | ADMIN --roles (1,2,3)