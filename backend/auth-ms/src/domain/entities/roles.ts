import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users";

//las entidades de typeOrm solo trabajan sobre clases
@Entity("roles")
export class Role{
  @PrimaryColumn()
  role_id!: number; 
  @Column({ unique: true, length: 50, nullable: false })
  name!: string;

  @Column({ length: 100, nullable: false })
  description!: string;

  @CreateDateColumn({ nullable: false })
  created_at!: Date;
  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => User, user => user.role)
  users!: User[]
}