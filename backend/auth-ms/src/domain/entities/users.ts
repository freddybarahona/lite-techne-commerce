import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./roles";

@Entity("users")
export class User{
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column()
  password_hash!: string;

  @ManyToOne(() => Role)
  @JoinColumn({name: "role_id"})
  role!: Role;

  @Column()
  is_active!: boolean;

  @CreateDateColumn({ nullable: false })
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

// CUSTOMER | SELLER | ADMIN --roles (1,2,3)